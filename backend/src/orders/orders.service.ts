import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CurrenciesService } from '../currencies/currencies.service';
import { Inventory } from '../inventory/inventory.entity';
import { PayformsService } from '../payforms/payforms.service';
import { Product } from '../products/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrderPayment } from './entities/order-payment.entity';
import { OrderShipping } from './entities/order-shipping.entity';
import { OrderStatusHistory } from './entities/order-status-history.entity';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { PaymentStatus } from './enums/payment-status.enum';
import { ShippingMethod } from './enums/shipping-method.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderStatusHistory)
    private readonly historyRepo: Repository<OrderStatusHistory>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
    private readonly payformsService: PayformsService,
    private readonly currenciesService: CurrenciesService,
    private readonly dataSource: DataSource,
  ) {}

  private async generateOrderNumber(): Promise<string> {
    const result = await this.dataSource.query(
      `SELECT nextval('order_number_seq') AS num`,
    );
    return `ORD-${result[0].num}`;
  }

  async create(userId: string, dto: CreateOrderDto): Promise<Order> {
    const payform = await this.payformsService.findOne(dto.payformId);
    if (!payform.isActive) {
      throw new BadRequestException(
        `La forma de pago '${payform.name}' no está disponible`,
      );
    }

    // Resolve the order currency and base currency
    const baseCurrency = await this.currenciesService.findDefault();
    const orderCurrency = dto.currencyId
      ? await this.currenciesService.findCurrency(dto.currencyId)
      : baseCurrency;

    return this.dataSource.transaction(async (manager) => {
      // Resolve products and validate inventory
      const resolvedItems: {
        product: Product;
        quantity: number;
        inventory: Inventory;
      }[] = [];

      for (const itemDto of dto.items) {
        const product = await manager.findOne(Product, {
          where: { id: itemDto.productId },
          relations: ['inventory', 'currency'],
        });
        if (!product)
          throw new NotFoundException(`Product ${itemDto.productId} not found`);
        if (!product.inventory)
          throw new BadRequestException(
            `Product ${product.name} has no inventory`,
          );
        if (product.inventory.remaining < itemDto.quantity) {
          throw new BadRequestException(
            `Stock insuficiente para '${product.name}'. Disponible: ${product.inventory.remaining}`,
          );
        }
        resolvedItems.push({
          product,
          quantity: itemDto.quantity,
          inventory: product.inventory,
        });
      }

      // Build order items with price + currency snapshot
      const orderItems: OrderItem[] = [];
      for (const { product, quantity } of resolvedItems) {
        const item = new OrderItem();
        item.product = product;
        item.productName = product.name;
        item.productSku = product.sku;
        item.currencyCode = product.currency.code;
        item.currencyName = product.currency.name;
        item.currencySymbol = product.currency.symbol;
        item.baseCurrencyCode = baseCurrency.code;
        item.baseCurrencySymbol = baseCurrency.symbol;

        // Exchange rate: product currency → base currency
        if (product.currency.code === baseCurrency.code) {
          item.exchangeRate = 1;
        } else {
          const rateEntity = await this.currenciesService.getLatestRate(
            product.currency.code,
            baseCurrency.code,
          );
          item.exchangeRate = Number(rateEntity.rate);
        }

        // Convert price to order currency if different
        const rawPrice = Number(product.salePrice ?? product.basePrice);
        if (product.currency.code === orderCurrency.code) {
          item.unitPrice = rawPrice;
        } else {
          const { converted } = await this.currenciesService.convert(
            product.currency.code,
            orderCurrency.code,
            rawPrice,
          );
          item.unitPrice = converted;
        }

        item.quantity = quantity;
        orderItems.push(item);
      }

      // Calculate totals
      const subtotal = orderItems.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      );
      const shippingCost = dto.shippingCost ?? 0;
      const tax = dto.tax ?? 0;
      const total = subtotal + shippingCost + tax;

      // Build order
      const orderNumber = await this.generateOrderNumber();
      const order = manager.create(Order, {
        orderNumber,
        user: { id: userId },
        status: OrderStatus.PENDING,
        subtotal,
        shippingCost,
        tax,
        total,
        notes: dto.notes ?? null,
        currencyCode: orderCurrency.code,
        currencyName: orderCurrency.name,
        currencySymbol: orderCurrency.symbol,
        items: orderItems,
      });

      // Build payment snapshot
      const payment = manager.create(OrderPayment, {
        payform,
        payformName: payform.name,
        payformCode: payform.code,
        payformProvider: payform.provider ?? undefined,
        lastFour: dto.lastFour ?? undefined,
        amount: total,
        status: PaymentStatus.PENDING,
      });
      order.payment = payment;

      // Build shipping snapshot
      const shipping = manager.create(OrderShipping, {
        recipientName: dto.shipping.recipientName,
        street: dto.shipping.street,
        city: dto.shipping.city,
        state: dto.shipping.state,
        postalCode: dto.shipping.postalCode,
        country: dto.shipping.country ?? 'MX',
        phone: dto.shipping.phone ?? undefined,
        shippingMethod: dto.shipping.shippingMethod ?? ShippingMethod.STANDARD,
      });
      order.shipping = shipping;

      const savedOrder = await manager.save(Order, order);

      // Record initial status history
      await manager.save(
        OrderStatusHistory,
        manager.create(OrderStatusHistory, {
          order: savedOrder,
          status: OrderStatus.PENDING,
          note: null,
        }),
      );

      // Decrement inventory
      for (const { inventory, quantity } of resolvedItems) {
        await manager.update(Inventory, inventory.id, {
          remaining: inventory.remaining - quantity,
          available: inventory.remaining - quantity > 0 ? 1 : 0,
        });
      }

      return this.orderRepo.findOne({
        where: { id: savedOrder.id },
        relations: ['payment', 'shipping', 'items'],
      }) as Promise<Order>;
    });
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['payment', 'shipping', 'items', 'statusHistory'],
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  async findAll(page: number, perPage: number) {
    const [data, total] = await this.orderRepo.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
      order: { createdAt: 'DESC' },
      relations: ['payment', 'shipping'],
    });
    return { data, total, page, perPage };
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.findOne(Order, { where: { id } });
      if (!order) throw new NotFoundException(`Order ${id} not found`);

      order.status = dto.status;
      await manager.save(Order, order);

      await manager.save(
        OrderStatusHistory,
        manager.create(OrderStatusHistory, {
          order,
          status: dto.status,
          note: dto.note ?? null,
        }),
      );

      return this.findOne(id);
    });
  }
}

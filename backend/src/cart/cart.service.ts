import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import { Product } from '../products/product.entity';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartStatus } from './enums/cart-status.enum';

const CART_TTL_DAYS = 7;

function expiresAt(): Date {
  const date = new Date();
  date.setDate(date.getDate() + CART_TTL_DAYS);
  return date;
}

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly ordersService: OrdersService,
  ) {}

  private async getOrCreateActiveCart(
    userId?: string,
    guestToken?: string,
  ): Promise<Cart> {
    const where = userId
      ? { user: { id: userId }, status: CartStatus.ACTIVE }
      : { guestToken, status: CartStatus.ACTIVE };

    let cart = await this.cartRepo.findOne({
      where,
      relations: ['items', 'items.product'],
    });

    // Check expiration
    if (cart && cart.expiresAt < new Date()) {
      cart.status = CartStatus.ABANDONED;
      await this.cartRepo.save(cart);
      cart = null;
    }

    if (!cart) {
      const newCart = this.cartRepo.create({
        user: userId ? { id: userId } : null,
        guestToken: userId ? null : (guestToken ?? randomUUID()),
        status: CartStatus.ACTIVE,
        expiresAt: expiresAt(),
        items: [],
      });
      cart = await this.cartRepo.save(newCart);
    }

    return cart;
  }

  private async renewExpiration(cart: Cart): Promise<void> {
    cart.expiresAt = expiresAt();
    await this.cartRepo.save(cart);
  }

  private async refreshCart(cartId: string): Promise<Cart> {
    return this.cartRepo.findOne({
      where: { id: cartId },
      relations: ['items', 'items.product'],
    }) as Promise<Cart>;
  }

  async getCart(userId?: string, guestToken?: string): Promise<Cart> {
    return this.getOrCreateActiveCart(userId, guestToken);
  }

  async addItem(
    userId: string | undefined,
    guestToken: string | undefined,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product)
      throw new NotFoundException(`Producto ${productId} no encontrado`);

    const cart = await this.getOrCreateActiveCart(userId, guestToken);

    const existingItem = cart.items.find(
      (item) => item.product.id === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      await this.cartItemRepo.save(existingItem);
    } else {
      const newItem = this.cartItemRepo.create({
        cart,
        product,
        quantity,
      });
      await this.cartItemRepo.save(newItem);
    }

    await this.renewExpiration(cart);
    return this.refreshCart(cart.id);
  }

  async updateItemQuantity(
    userId: string | undefined,
    guestToken: string | undefined,
    itemId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.getOrCreateActiveCart(userId, guestToken);

    const item = cart.items.find((i) => i.id === itemId);
    if (!item)
      throw new NotFoundException(`Item ${itemId} no encontrado en el carrito`);

    item.quantity = quantity;
    await this.cartItemRepo.save(item);

    await this.renewExpiration(cart);
    return this.refreshCart(cart.id);
  }

  async removeItem(
    userId: string | undefined,
    guestToken: string | undefined,
    itemId: string,
  ): Promise<Cart> {
    const cart = await this.getOrCreateActiveCart(userId, guestToken);

    const item = cart.items.find((i) => i.id === itemId);
    if (!item)
      throw new NotFoundException(`Item ${itemId} no encontrado en el carrito`);

    await this.cartItemRepo.remove(item);

    await this.renewExpiration(cart);
    return this.refreshCart(cart.id);
  }

  async clearCart(userId?: string, guestToken?: string): Promise<Cart> {
    const cart = await this.getOrCreateActiveCart(userId, guestToken);

    if (cart.items.length > 0) {
      await this.cartItemRepo.remove(cart.items);
      cart.items = [];
    }

    await this.renewExpiration(cart);
    return this.refreshCart(cart.id);
  }

  async mergeGuestCart(userId: string, guestToken: string): Promise<Cart> {
    const guestCart = await this.cartRepo.findOne({
      where: { guestToken, status: CartStatus.ACTIVE },
      relations: ['items', 'items.product'],
    });

    if (!guestCart || guestCart.items.length === 0) {
      return this.getOrCreateActiveCart(userId);
    }

    // Check guest cart expiration
    if (guestCart.expiresAt < new Date()) {
      guestCart.status = CartStatus.ABANDONED;
      await this.cartRepo.save(guestCart);
      return this.getOrCreateActiveCart(userId);
    }

    const userCart = await this.getOrCreateActiveCart(userId);

    for (const guestItem of guestCart.items) {
      const existingItem = userCart.items.find(
        (i) => i.product.id === guestItem.product.id,
      );

      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
        await this.cartItemRepo.save(existingItem);
      } else {
        const newItem = this.cartItemRepo.create({
          cart: userCart,
          product: guestItem.product,
          quantity: guestItem.quantity,
        });
        await this.cartItemRepo.save(newItem);
      }
    }

    // Mark guest cart as abandoned
    guestCart.status = CartStatus.ABANDONED;
    await this.cartRepo.save(guestCart);

    await this.renewExpiration(userCart);
    return this.refreshCart(userCart.id);
  }

  async checkout(userId: string, dto: CheckoutCartDto): Promise<Order> {
    const cart = await this.getOrCreateActiveCart(userId);

    if (cart.items.length === 0) {
      throw new BadRequestException('El carrito está vacío');
    }

    const orderDto: CreateOrderDto = {
      items: cart.items.map((ci) => ({
        productId: ci.product.id,
        quantity: ci.quantity,
      })),
      payformId: dto.payformId,
      currencyId: dto.currencyId,
      lastFour: dto.lastFour,
      shipping: dto.shipping,
      notes: dto.notes,
      shippingCost: dto.shippingCost,
      tax: dto.tax,
    };

    const order = await this.ordersService.create(userId, orderDto);

    cart.status = CartStatus.CONVERTED;
    await this.cartRepo.save(cart);

    return order;
  }
}

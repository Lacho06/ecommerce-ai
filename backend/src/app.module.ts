import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/category.entity';
import { CurrenciesModule } from './currencies/currencies.module';
import { Currency } from './currencies/currency.entity';
import { ExchangeRate } from './currencies/exchange-rate.entity';
import { baseDataSourceOptions } from './database/data-source';
import { ImagesModule } from './images/images.module';
import { Image } from './images/image.entity';
import { InventoryModule } from './inventory/inventory.module';
import { Inventory } from './inventory/inventory.entity';
import { pinoStreams } from './logger/logger.config';
import { OrderItem } from './orders/entities/order-item.entity';
import { OrderPayment } from './orders/entities/order-payment.entity';
import { OrderShipping } from './orders/entities/order-shipping.entity';
import { OrderStatusHistory } from './orders/entities/order-status-history.entity';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { Payform } from './payforms/payform.entity';
import { PayformsModule } from './payforms/payforms.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tag.entity';
import { UserAddress } from './user-addresses/user-address.entity';
import { UserAddressesModule } from './user-addresses/user-addresses.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        stream: pinoStreams,
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        redact: {
          paths: ['req.headers.authorization', 'req.headers.cookie'],
          censor: '[REDACTED]',
        },
        serializers: {
          req(req) {
            return { method: req.method, url: req.url, id: req.id };
          },
          res(res) {
            return { statusCode: res.statusCode };
          },
        },
        customLogLevel(_req, res, err) {
          if (res.statusCode >= 500 || err) return 'error';
          if (res.statusCode >= 400) return 'warn';
          return 'info';
        },
        customErrorMessage: (_req, res) =>
          `request errored with status code: ${res.statusCode}`,
      },
    }),
    TypeOrmModule.forRoot({
      ...baseDataSourceOptions,
      entities: [
        User, Product, Category, Tag, Inventory, Image,
        Order, OrderItem, OrderPayment, OrderShipping, OrderStatusHistory,
        Payform, UserAddress, Currency, ExchangeRate,
      ],
      synchronize: false, // solo desarrollo — en prod usar migraciones
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    TagsModule,
    InventoryModule,
    ImagesModule,
    OrdersModule,
    PayformsModule,
    UserAddressesModule,
    CurrenciesModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}

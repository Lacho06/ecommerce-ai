import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  getCart(
    @CurrentUser() user: { id: string } | null,
    @Headers('x-guest-token') guestToken?: string,
  ) {
    return this.cartService.getCart(user?.id, guestToken);
  }

  @Post('items')
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  addItem(
    @CurrentUser() user: { id: string } | null,
    @Headers('x-guest-token') guestToken: string | undefined,
    @Body() dto: AddCartItemDto,
  ) {
    return this.cartService.addItem(
      user?.id,
      guestToken,
      dto.productId,
      dto.quantity ?? 1,
    );
  }

  @Patch('items/:itemId')
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  updateItem(
    @CurrentUser() user: { id: string } | null,
    @Headers('x-guest-token') guestToken: string | undefined,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItemQuantity(
      user?.id,
      guestToken,
      itemId,
      dto.quantity,
    );
  }

  @Delete('items/:itemId')
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  removeItem(
    @CurrentUser() user: { id: string } | null,
    @Headers('x-guest-token') guestToken: string | undefined,
    @Param('itemId') itemId: string,
  ) {
    return this.cartService.removeItem(user?.id, guestToken, itemId);
  }

  @Delete()
  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  clearCart(
    @CurrentUser() user: { id: string } | null,
    @Headers('x-guest-token') guestToken?: string,
  ) {
    return this.cartService.clearCart(user?.id, guestToken);
  }

  @Post('merge')
  mergeGuestCart(
    @CurrentUser() user: { id: string },
    @Body('guestToken') guestToken: string,
  ) {
    return this.cartService.mergeGuestCart(user.id, guestToken);
  }

  @Post('checkout')
  checkout(
    @CurrentUser() user: { id: string },
    @Body() dto: CheckoutCartDto,
  ) {
    return this.cartService.checkout(user.id, dto);
  }
}

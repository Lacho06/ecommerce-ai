import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Public()
  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('perPage') perPage = '10',
  ) {
    return this.productsService.findAll(Number(page), Number(perPage));
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}

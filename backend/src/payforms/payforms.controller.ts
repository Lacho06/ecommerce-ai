import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { CreatePayformDto } from './dto/create-payform.dto';
import { PayformsService } from './payforms.service';

@Controller('payforms')
export class PayformsController {
  constructor(private readonly payformsService: PayformsService) {}

  @Post()
  create(@Body() dto: CreatePayformDto) {
    return this.payformsService.create(dto);
  }

  @Public()
  @Get()
  findActive() {
    return this.payformsService.findActive();
  }

  @Get('all')
  findAll() {
    return this.payformsService.findAll();
  }

  @Patch(':id/toggle')
  toggleActive(@Param('id') id: string) {
    return this.payformsService.toggleActive(id);
  }
}

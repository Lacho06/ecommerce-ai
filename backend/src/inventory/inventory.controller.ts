import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Public()
  @Get('product/:productId')
  findByProductId(@Param('productId') productId: string) {
    return this.inventoryService.findByProductId(productId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.inventoryService.update(id, dto);
  }
}

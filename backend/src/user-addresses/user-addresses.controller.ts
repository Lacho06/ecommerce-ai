import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UserAddressesService } from './user-addresses.service';

@Controller('user-addresses')
export class UserAddressesController {
  constructor(private readonly userAddressesService: UserAddressesService) {}

  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateUserAddressDto) {
    return this.userAddressesService.create(user.id, dto);
  }

  @Get()
  findAll(@CurrentUser() user: { id: string }) {
    return this.userAddressesService.findByUser(user.id);
  }

  @Delete(':id')
  remove(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.userAddressesService.remove(id, user.id);
  }
}

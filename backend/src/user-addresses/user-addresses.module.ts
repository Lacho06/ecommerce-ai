import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressesController } from './user-addresses.controller';
import { UserAddress } from './user-address.entity';
import { UserAddressesService } from './user-addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  controllers: [UserAddressesController],
  providers: [UserAddressesService],
  exports: [UserAddressesService],
})
export class UserAddressesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayformsController } from './payforms.controller';
import { Payform } from './payform.entity';
import { PayformsService } from './payforms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payform])],
  controllers: [PayformsController],
  providers: [PayformsService],
  exports: [PayformsService],
})
export class PayformsModule {}

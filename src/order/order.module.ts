import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [forwardRef(() => PaymentModule)],
  exports: [OrderService]
})
export class OrderModule {}

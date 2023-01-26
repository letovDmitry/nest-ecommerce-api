import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
  imports: [forwardRef(() => OrderModule)],
})
export class PaymentModule {}

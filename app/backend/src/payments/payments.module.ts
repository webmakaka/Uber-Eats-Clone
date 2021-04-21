import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Payment} from 'payments/entities/payment.entity';
import {PaymentResolver} from 'payments/payments.resolver';
import {PaymentService} from 'payments/payments.service';
import { Restaurant } from 'restaurants/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Restaurant])],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentsModule {}

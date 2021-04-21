import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from 'payments/dtos/create-payment.dto';
import { GetPaymentsOutput } from 'payments/dtos/get-payments.dto';
import { Payment } from 'payments/entities/payment.entity';
import { Restaurant } from 'restaurants/entities/restaurant.entity';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  async createPayment(
    owner: User,
    { transactionId, restaurantId }: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);

      if (!restaurant) {
        return {
          ok: false,
          error: '[App] Restaurant not found',
        };
      }

      if (restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: "[App] You can't to this",
        };
      }

      await this.payments.save(
        this.payments.create({
          transactionId,
          user: owner,
          restaurant,
        }),
      );

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '[App] Could not create payment',
      };
    }
  }

  async getPayments(user: User): Promise<GetPaymentsOutput> {
    try {
      const payments = await this.payments.find({ user: user });
      return {
        ok: true,
        payments,
      };
    } catch {
      return {
        ok: false,
        error: '[App] Could not load paymenst',
      };
    }
  }

  // End: payments.service.ts
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'auth/auth-user.decorator';
import { Role } from 'auth/role.decorator';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from 'payments/dtos/create-payment.dto';
import { Payment } from 'payments/entities/payment.entity';
import { PaymentService } from 'payments/payments.service';
import { EUserRole, User } from 'users/entities/user.entity';

@Resolver((of) => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation((returns) => CreatePaymentOutput)
  @Role([EUserRole.Owner])
  createPayment(
    @AuthUser() owner: User,
    @Args('input') createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(owner, createPaymentInput);
  }
}

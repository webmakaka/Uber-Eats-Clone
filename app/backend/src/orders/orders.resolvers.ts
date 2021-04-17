import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'auth/auth-user.decorator';
import { Role } from 'auth/role.decorator';
import {
  CreateOrderInput,
  CreateOrderOutput,
} from 'orders/dtos/create-order.dto';
import { Order } from 'orders/entities/order.entity';
import { OrderService } from 'orders/orders.service';
import { EUserRole, User } from 'users/entities/user.entity';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation((returns) => CreateOrderOutput)
  @Role([EUserRole.Client])
  async createOrder(
    @AuthUser() customer: User,
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(customer, createOrderInput);
  }
}

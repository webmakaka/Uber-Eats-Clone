import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuthUser } from 'auth/auth-user.decorator';
import { Role } from 'auth/role.decorator';
import { PUB_SUB } from 'common/common.constants';
import { PubSub } from 'graphql-subscriptions';
import {
  CreateOrderInput,
  CreateOrderOutput,
} from 'orders/dtos/create-order.dto';
import { EditOrderInput, EditOrderOutput } from 'orders/dtos/edit-order.dto';
import { GetOrderInput, GetOrderOutput } from 'orders/dtos/get-order.dto';
import { GetOrdersInput, GetOrdersOutput } from 'orders/dtos/get-orders.dto';
import { Order } from 'orders/entities/order.entity';
import { OrderService } from 'orders/orders.service';
import { EUserRole, User } from 'users/entities/user.entity';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(
    private readonly ordersService: OrderService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Mutation((returns) => CreateOrderOutput)
  @Role([EUserRole.Client])
  async createOrder(
    @AuthUser() customer: User,
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.ordersService.createOrder(customer, createOrderInput);
  }

  @Query((returns) => GetOrdersOutput)
  @Role(['Any'])
  async getOrders(
    @AuthUser() user: User,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.ordersService.getOrders(user, getOrdersInput);
  }

  @Query((returns) => GetOrderOutput)
  @Role(['Any'])
  async getOrder(
    @AuthUser() user: User,
    @Args('input') getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.ordersService.getOrder(user, getOrderInput);
  }

  @Mutation((returns) => EditOrderOutput)
  @Role(['Any'])
  async editOrder(
    @AuthUser() user: User,
    @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.ordersService.editOrder(user, editOrderInput);
  }

  @Subscription((returns) => String)
  @Role(['Any'])
  orderSubscription(@AuthUser() user: User) {
    return pubsub.asyncIterator('hotPotatoes');
  }

  // The End
}

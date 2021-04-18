import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateOrderInput,
  CreateOrderOutput,
} from 'orders/dtos/create-order.dto';
import { GetOrderInput, GetOrderOutput } from 'orders/dtos/get-order.dto';
import { GetOrdersInput, GetOrdersOutput } from 'orders/dtos/get-orders.dto';
import { OrderItem } from 'orders/entities/order-item.entity';
import { Order } from 'orders/entities/order.entity';
import { Dish } from 'restaurants/entities/dish.entity';
import { Restaurant } from 'restaurants/entities/restaurant.entity';
import { Repository } from 'typeorm';
import { EUserRole, User } from 'users/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>,
  ) {}

  async createOrder(
    customer: User,
    { restaurantId, items }: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);

      if (!restaurant) {
        return {
          ok: false,
          error: '[App] Restaurant not found',
        };
      }

      let orderFinalPrice = 0;
      const orderItems: OrderItem[] = [];

      for (const item of items) {
        const dish = await this.dishes.findOne(item.dishId);
        if (!dish) {
          return {
            ok: false,
            error: '[App] Dish not found',
          };
        }
        let dishFinalPrice = dish.price;

        for (const itemOption of item.options) {
          const dishOption = dish.options.find(
            (dishOption) => dishOption.name === itemOption.name,
          );
          if (dishOption) {
            if (dishOption.extra) {
              dishFinalPrice = dishFinalPrice + dishOption.extra;
            } else {
              const dishOptionChoice = dishOption.choices.find(
                (optionChoice) => optionChoice.name === itemOption.choice,
              );
              if (dishOptionChoice) {
                if (dishOptionChoice.extra) {
                  dishFinalPrice = dishFinalPrice + dishOptionChoice.extra;
                }
              }
            }
          }
        }

        orderFinalPrice = orderFinalPrice + dishFinalPrice;

        const orderItem = await this.orderItems.save(
          this.orderItems.create({
            dish,
            options: item.options,
          }),
        );

        orderItems.push(orderItem);
      }

      await this.orders.save(
        this.orders.create({
          customer,
          restaurant,
          total: orderFinalPrice,
          items: orderItems,
        }),
      );

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '[App] Could not create order',
      };
    }
  }

  async getOrders(
    user: User,
    { status }: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    try {
      let orders: Order[];

      if (user.role === EUserRole.Client) {
        orders = await this.orders.find({
          where: {
            customer: user,
            ...(status && { status }),
          },
        });
      } else if (user.role === EUserRole.Delivery) {
        orders = await this.orders.find({
          where: {
            driver: user,
            ...(status && { status }),
          },
        });
      } else if (user.role === EUserRole.Owner) {
        const restaurants = await this.restaurants.find({
          where: {
            owner: user,
          },
          relations: ['orders'],
        });
        orders = restaurants.map((restaurant) => restaurant.orders).flat();

        if (status) {
          orders = orders.filter((order) => order.status === status);
        }
      }
      return {
        ok: true,
        orders,
      };
    } catch {
      return {
        ok: false,
        error: '[App] Could not get orders',
      };
    }
  }

  async getOrder(
    user: User,
    { id: orderId }: GetOrderInput,
  ): Promise<GetOrderOutput> {
    try {
      const order = await this.orders.findOne(orderId, {
        relations: ['restaurant'],
      });
      if (!order) {
        return {
          ok: false,
          error: '[App] Order not found',
        };
      }

      let canSee = true;
      if (user.role === EUserRole.Client && order.customerId !== user.id) {
        canSee = false;
      }

      if (user.role === EUserRole.Delivery && order.driverId !== user.id) {
        canSee = false;
      }

      if (
        user.role === EUserRole.Owner &&
        order.restaurant.ownerId !== user.id
      ) {
        canSee = false;
      }

      if (!canSee) {
        return {
          ok: false,
          error: "[App] You can't see that",
        };
      }

      return {
        ok: true,
        order,
      };
    } catch {
      return {
        ok: false,
        error: '[App] Could not find order',
      };
    }
  }
}

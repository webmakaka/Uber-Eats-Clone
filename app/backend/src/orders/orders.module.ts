import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {OrderItem} from 'orders/entities/order-item.entity';
import {Order} from 'orders/entities/order.entity';
import {OrderResolver} from 'orders/orders.resolvers';
import {OrderService} from 'orders/orders.service';
import {Dish} from 'restaurants/entities/dish.entity';
import {Restaurant} from 'restaurants/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish])],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}

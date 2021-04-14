import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'restaurants/entities/restaurant.entity';
import { CategoryRepository } from 'restaurants/repositories/category.repository';
import {
  CategoryResolver,
  RestaurantResolver,
} from 'restaurants/restaurants.resolver';
import { RestaurantService } from 'restaurants/restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
  providers: [RestaurantResolver, RestaurantService, CategoryResolver],
})
export class RestaurantsModule {}

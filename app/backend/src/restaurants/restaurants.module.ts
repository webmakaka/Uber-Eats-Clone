import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from 'restaurants/category.resolver';
import { Restaurant } from 'restaurants/entities/restaurant.entity';
import { CategoryRepository } from 'restaurants/repositories/category.repository';
import { RestaurantResolver } from 'restaurants/restaurants.resolver';
import { RestaurantService } from 'restaurants/restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
  providers: [RestaurantResolver, RestaurantService, CategoryResolver],
})
export class RestaurantsModule {}

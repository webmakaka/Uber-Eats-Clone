import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Dish} from 'restaurants/entities/dish.entity';
import {Restaurant} from 'restaurants/entities/restaurant.entity';
import {CategoryRepository} from 'restaurants/repositories/category.repository';
import {
  CategoryResolver,
  DishResolver,
  RestaurantResolver
} from 'restaurants/restaurants.resolver';
import {RestaurantService} from 'restaurants/restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository, Dish])],
  providers: [
    RestaurantResolver,
    RestaurantService,
    CategoryResolver,
    DishResolver,
  ],
})
export class RestaurantsModule {}

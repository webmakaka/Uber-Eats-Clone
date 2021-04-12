import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Category} from 'restaurants/entities/category.entity';
import {Restaurant} from 'restaurants/entities/restaurant.entity';
import {RestaurantResolver} from 'restaurants/restaurants.resolver';
import {RestaurantService} from 'restaurants/restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category])],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}

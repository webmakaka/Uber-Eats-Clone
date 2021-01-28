import { Module } from '@nestjs/common';
import { RestaurantResolver } from 'restaurants/restaurants.resolver';

@Module({
  providers: [RestaurantResolver],
})
export class RestaurantsModule {}

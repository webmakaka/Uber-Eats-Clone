import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'auth/auth-user.decorator';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from 'restaurants/dtos/create-restaurant.dto';
import { Restaurant } from 'restaurants/entities/restaurant.entity';
import { RestaurantService } from 'restaurants/restaurants.service';
import { User } from 'users/entities/user.entity';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((returns) => CreateRestaurantOutput)
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurant(
      authUser,
      createRestaurantInput,
    );
  }
}

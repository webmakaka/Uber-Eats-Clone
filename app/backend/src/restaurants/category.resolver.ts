import { Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AllCategoriesOutput } from 'restaurants/dtos/all-categories.dto';
import { Category } from 'restaurants/entities/category.entity';
import { RestaurantService } from 'restaurants/restaurants.service';

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ResolveField((type) => Int)
  restaurantCount(@Parent() category: Category): Promise<number> {
    return this.restaurantService.countRestaurants(category);
  }

  @Query((type) => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.restaurantService.allCategories();
  }
}

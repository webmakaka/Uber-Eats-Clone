import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import {AuthUser} from 'auth/auth-user.decorator';
import {Role} from 'auth/role.decorator';
import {AllCategoriesOutput} from 'restaurants/dtos/all-categories.dto';
import {CategoryInput, CategoryOutput} from 'restaurants/dtos/category.dto';
import {
  CreateDishInput,
  CreateDishOutput
} from 'restaurants/dtos/create-dish.dto';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput
} from 'restaurants/dtos/create-restaurant.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput
} from 'restaurants/dtos/delete-restaurant.dto';
import {
  EditRestaurantInput,
  EditRestaurantOutput
} from 'restaurants/dtos/edit.restaurant.dto';
import {
  RestaurantInput,
  RestaurantOutput
} from 'restaurants/dtos/restaurant.dto';
import {
  RestaurantsInput,
  RestaurantsOutput
} from 'restaurants/dtos/restaurants.dto';
import {
  SearchRestaurantInput,
  SearchRestaurantOutput
} from 'restaurants/dtos/search-restaurant.dto';
import {Category} from 'restaurants/entities/category.entity';
import {Dish} from 'restaurants/entities/dish.entity';
import {Restaurant} from 'restaurants/entities/restaurant.entity';
import {RestaurantService} from 'restaurants/restaurants.service';
import {EUserRole, User} from 'users/entities/user.entity';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((returns) => CreateRestaurantOutput)
  @Role([EUserRole.Owner])
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurant(
      authUser,
      createRestaurantInput,
    );
  }

  @Mutation((returns) => EditRestaurantOutput)
  @Role([EUserRole.Owner])
  editRestaurant(
    @AuthUser() owner: User,
    @Args('input') editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    return this.restaurantService.editRestaurant(owner, editRestaurantInput);
  }

  @Mutation((returns) => DeleteRestaurantOutput)
  @Role([EUserRole.Owner])
  deleteRestaurant(
    @AuthUser() owner: User,
    @Args('input') deleteRestaurantInput: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    return this.restaurantService.deleteRestaurant(
      owner,
      deleteRestaurantInput,
    );
  }

  @Query((returns) => RestaurantsOutput)
  restaurants(
    @Args('input') RestaurantsInput: RestaurantsInput,
  ): Promise<RestaurantsOutput> {
    return this.restaurantService.allRestaurants(RestaurantsInput);
  }

  @Query((returns) => RestaurantOutput)
  restaurant(
    @Args('input') RestaurantInput: RestaurantInput,
  ): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantById(RestaurantInput);
  }

  @Query((returns) => SearchRestaurantOutput)
  searchRestaurant(
    @Args('input') searchRestaurantInput: SearchRestaurantInput,
  ): Promise<SearchRestaurantOutput> {
    return this.restaurantService.searchRestaurantByName(searchRestaurantInput);
  }
}

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

  @Query((type) => CategoryOutput)
  category(
    @Args('input') categoryInput: CategoryInput,
  ): Promise<CategoryOutput> {
    return this.restaurantService.findCategoryBySlug(categoryInput);
  }
}

@Resolver((of) => Dish)
export class DishResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((type) => CreateDishOutput)
  @Role([EUserRole.Owner])
  createDish(
    @AuthUser() owner: User,
    @Args('input') createDishInput: CreateDishInput,
  ) {
    return this.restaurantService.createDish(owner, createDishInput);
  }
}

import {Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {CoreOutput} from 'common/dtos/output.dto';
import {Restaurant} from 'restaurants/entities/restaurant.entity';

@InputType()
export class RestaurantInput {
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class RestaurantOutput extends CoreOutput {
  @Field((type) => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}

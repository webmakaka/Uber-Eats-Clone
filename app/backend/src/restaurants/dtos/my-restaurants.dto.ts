import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';
import { Restaurant } from 'restaurants/entities/restaurant.entity';

@ObjectType()
export class MyRestaurantsOutput extends CoreOutput {
  @Field((type) => [Restaurant])
  restaurants?: Restaurant[];
}

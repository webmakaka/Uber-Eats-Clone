import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';
import { Category } from 'restaurants/entities/category.entity';

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field((type) => [Category], { nullable: true })
  categories?: Category[];
}

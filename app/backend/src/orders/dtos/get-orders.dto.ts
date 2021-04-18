import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {CoreOutput} from 'common/dtos/output.dto';
import {EOrderStatus, Order} from 'orders/entities/order.entity';

@InputType()
export class GetOrdersInput {
  @Field((type) => EOrderStatus, { nullable: true })
  status?: EOrderStatus;
}

@ObjectType()
export class GetOrdersOutput extends CoreOutput {
  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}

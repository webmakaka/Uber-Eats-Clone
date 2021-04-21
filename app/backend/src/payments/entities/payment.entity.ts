import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'common/entities/core.entity';
import { Restaurant } from 'restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { User } from 'users/entities/user.entity';

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Field((type) => String)
  @Column()
  transactionId: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.payments)
  user: User;

  @RelationId((payment: Payment) => payment.user)
  userId: number;

  @Field((type) => Restaurant)
  @ManyToOne((type) => Restaurant)
  restaurant: Restaurant;

  @Field((type) => Int)
  @RelationId((payment: Payment) => payment.restaurant)
  restaurantId: number;

  // End: payment.entity.ts
}

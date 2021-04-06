import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'common/entities/core.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from 'users/entities/user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field((type) => String)
  code: string;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
}

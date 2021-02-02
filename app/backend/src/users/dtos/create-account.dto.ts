import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'common/dtos/output.dto';
import { User } from 'users/entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutput extends MutationOutput {}

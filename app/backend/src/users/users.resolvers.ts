import { Resolver, Query } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from 'users/dtos/create-account.dto';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.usersService.createAccount(
        createAccountInput,
      );

      return {
        ok,
        error,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

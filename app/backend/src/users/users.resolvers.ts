import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'auth/auth-user.decorator';
import { AuthGuard } from 'auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from 'users/dtos/create-account.dto';
import { LoginInput, LoginOutput } from 'users/dtos/login.dto';
import {
  UserProfileInput,
  UserProfileOutput,
} from 'users/dtos/user-profile.dto';
import { User } from 'users/entities/user.entity';
import { UserService } from 'users/users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly UserService: UserService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput
  ): Promise<CreateAccountOutput> {
    try {
      return this.UserService.createAccount(createAccountInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.UserService.login(loginInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query((returns) => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput
  ): Promise<UserProfileOutput> {
    try {
      const user = await this.UserService.findById(userProfileInput.userId);

      if (!user) {
        throw Error();
      }
      return {
        ok: true,
        user,
      };
    } catch (e) {
      return {
        error: 'User Not Found',
        ok: false,
      };
    }
  }
}

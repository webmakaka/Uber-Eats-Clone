import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'auth/auth-user.decorator';
import { AuthGuard } from 'auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from 'users/dtos/create-account.dto';
import {
  EditProfileInput,
  EditProfileOutput,
} from 'users/dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from 'users/dtos/login.dto';
import {
  UserProfileInput,
  UserProfileOutput,
} from 'users/dtos/user-profile.dto';
import {
  VerifyEmailInput,
  VerifyEmailOutput,
} from 'users/dtos/verify-email.dto';
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
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.UserService.createAccount(createAccountInput);
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
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.UserService.findById(userProfileInput.userId);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      await this.UserService.editProfile(authUser.id, editProfileInput);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Mutation((returns) => VerifyEmailOutput)
  verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return this.UserService.verifyEmail(code);
  }
}

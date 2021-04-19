import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {AuthGuard} from 'auth/auth.guard';
import {UsersModule} from 'users/users.module';

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}

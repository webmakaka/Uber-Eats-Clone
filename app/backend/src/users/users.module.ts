import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';
import { Verification } from 'users/entities/verification.entity';
import { UsersResolver } from 'users/users.resolvers';
import { UsersService } from 'users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}

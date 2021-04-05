import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';
import { UsersResolver } from 'users/users.resolvers';
import { UserService } from 'users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UserService],
  exports: [UserService],
})
export class UsersModule {}

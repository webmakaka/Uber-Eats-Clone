import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from 'users/dtos/create-account.dto';
import { User } from 'users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email });

      if (exists) {
        return {
          ok: false,
          error: '[App] There is a user with that email already!',
        };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: "[App] Couldn't create account" };
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'jwt/jwt.service';
import { Repository } from 'typeorm';
import { CreateAccountInput } from 'users/dtos/create-account.dto';
import { EditProfileInput } from 'users/dtos/edit-profile.dto';
import { LoginInput } from 'users/dtos/login.dto';
import { User } from 'users/entities/user.entity';
import { Verification } from 'users/entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
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
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );

      await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );

      return { ok: true };
    } catch (err) {
      return { ok: false, error: "[App] Couldn't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({ email });

      if (!user) {
        return {
          ok: false,
          error: '[App] User not found!',
        };
      }

      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '[App] Wrong password',
        };
      }

      const token = this.jwtService.sign(user.id);

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ id });
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    const user = await this.users.findOne(userId);
    if (email) {
      user.email = email;
      user.verified = false;
      await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );
    }
    if (password) {
      user.password = password;
    }

    return this.users.save(user);
  }
}

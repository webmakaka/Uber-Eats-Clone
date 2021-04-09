import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'jwt/jwt.service';
import { MailService } from 'mail/mail.service';
import { Repository } from 'typeorm';
import { CreateAccountInput } from 'users/dtos/create-account.dto';
import {
  EditProfileInput,
  EditProfileOutput,
} from 'users/dtos/edit-profile.dto';
import { LoginInput } from 'users/dtos/login.dto';
import { UserProfileOutput } from 'users/dtos/user-profile.dto';
import { VerifyEmailOutput } from 'users/dtos/verify-email.dto';
import { User } from 'users/entities/user.entity';
import { Verification } from 'users/entities/verification.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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

      const verification = await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );

      this.mailService.sendVerificationEmail(user.email, verification.code);

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
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );

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

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ id });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: '[App] User Not Found' };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(userId);
      if (email) {
        user.email = email;
        user.verified = false;
        const verification = await this.verifications.save(
          this.verifications.create({
            user,
          }),
        );

        this.mailService.sendVerificationEmail(user.email, verification.code);
      }
      if (password) {
        user.password = password;
      }

      await this.users.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: '[App] Could not update profile' };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verifications.findOne(
        { code },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        await this.users.save(verification.user);
        await this.verifications.delete(verification.id);
        return { ok: true };
      }
      return { ok: false, error: 'Vefification not found.' };
    } catch (error) {
      return { ok: false, error };
    }
  }
}

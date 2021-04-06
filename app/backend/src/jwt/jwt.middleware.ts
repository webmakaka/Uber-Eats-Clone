import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from 'jwt/jwt.service';
import { UsersService } from 'users/users.service';

@Injectable()
export class JwtMiddeware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UsersService: UsersService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      try {
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const user = await this.UsersService.findById(decoded['id']);
          req['user'] = user;
        }
      } catch (e) {}
    }
    next();
  }
}

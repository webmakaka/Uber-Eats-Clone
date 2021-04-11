import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from 'jwt/jwt.service';
import { UserService } from 'users/users.service';

@Injectable()
export class JwtMiddeware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UserService: UserService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      try {
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const { user, ok } = await this.UserService.findById(decoded['id']);
          if (ok) {
            req['user'] = user;
          }
        }
      } catch (e) {}
    }
    next();
  }
}

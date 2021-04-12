import { SetMetadata } from '@nestjs/common';
import { EUserRole } from 'users/entities/user.entity';

export type AllowedRoles = keyof typeof EUserRole | 'Any';
export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);

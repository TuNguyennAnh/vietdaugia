// src/auth/roles.decorator.ts
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard'; // Nếu có custom JwtGuard, nếu không thì dùng 'AuthGuard("jwt")' bên ngoài

export const ROLES_KEY = 'roles';

export function RequireRole(...roles: string[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}

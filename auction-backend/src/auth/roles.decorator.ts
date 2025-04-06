import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

export function RequireRole(role: string) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, new RolesGuard(role))
  );
}

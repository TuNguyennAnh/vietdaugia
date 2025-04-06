import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private requiredRole: string) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user || user.role !== this.requiredRole) {
        throw new ForbiddenException(`Chỉ ${this.requiredRole} mới được phép thực hiện hành động này.`);
      }
  
      return true;
    }
  }
  
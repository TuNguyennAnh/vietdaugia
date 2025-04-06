import {
    Controller,
    Get,
    UseGuards,
    Request,
    ForbiddenException,
    Body,
    Param,
    Patch,
    BadRequestException,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id/role')
    async updateRole(@Param('id') id: string, @Body() body, @Request() req) {
      if (req.user.role !== 'admin') {
        throw new ForbiddenException('Bạn không có quyền');
      }
  
      const { role } = body;
      if (!['buyer', 'seller'].includes(role)) {
        throw new BadRequestException('Role không hợp lệ');
      }
  
      await this.usersService.updateUserRole(id, role);
      return { message: 'Cập nhật thành công' };
    }
  }
  
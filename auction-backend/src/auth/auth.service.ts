import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    throw new UnauthorizedException('Sai email hoặc mật khẩu');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async register(userData: any) {
    const existing = await this.usersService.findByEmail(userData.email);
    if (existing) {
      throw new UnauthorizedException('Email đã tồn tại');
    }
    const hashed = await bcrypt.hash(userData.password, 10);
    const newUser = await this.usersService.create({
      email: userData.email,
      password: hashed,
      role: 'buyer',
    });
    const { password, ...result } = newUser.toJSON();
    return result;
  }
}

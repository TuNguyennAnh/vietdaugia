// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret', // đổi bằng env thật
    });
  }

  async validate(payload: any) {
    // Gắn giá trị trả về vào req.user
    return {
      sub: payload._id,           // 👈 dùng đúng _id bạn gán lúc tạo token
      email: payload.email,
      role: payload.role,
    };
  }
}

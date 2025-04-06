import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret', // thay bằng biến môi trường thật nếu có
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.sub || payload._id, // hỗ trợ cả sub và _id tùy theo lúc tạo token
      email: payload.email,
      role: payload.role,
    };
  }
}

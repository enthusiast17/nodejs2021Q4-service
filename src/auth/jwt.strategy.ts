import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from 'src/common/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET_KEY,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: {
    userId: string;
    login: string;
    iat: number;
    exp: number;
  }) {
    console.log(payload);
    return { userId: payload.userId, login: payload.login };
  }
}

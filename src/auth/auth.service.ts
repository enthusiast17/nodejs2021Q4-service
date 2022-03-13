import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import config from 'src/common/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateToken(
    userId: string,
    login: string,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.sign(
      { userId, login },
      {
        secret,
        expiresIn,
        algorithm: 'HS256',
      },
    );
  }

  async login(loginAuthDto: LoginAuthDto): Promise<string | null> {
    const user = await this.userService.findByLogin(loginAuthDto.login);
    if (!user || !(await compare(loginAuthDto.password, user.password))) {
      return null;
    }
    return this.generateToken(
      user.id,
      user.login,
      config.JWT_SECRET_KEY,
      config.JWT_EXPIRES_IN,
    );
  }
}

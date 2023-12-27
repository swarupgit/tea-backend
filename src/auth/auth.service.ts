import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<User> {
    if (new Date(payload.expiresIn).getTime() < new Date().getTime()) {
      throw new UnauthorizedException('Token is expired');
    }

    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException(
        'User is not authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async login(loginUserDto: AuthCredentialsDto) {
    const user = await this.usersService.findUserByCredentials(loginUserDto);
    const token = this.createJWTToken(user);

    return {
      message: 'You have logged in successfully.',
      result: { token, role: user.role },
    };
  }

  private createJWTToken({ mobile }: JwtPayload): any {
    const expiresIn = new Date(
      Date.now() + +this.configService.get('JWT_EXPIRES_IN'),
    ); // milliseconds,
    const accessToken = this.jwtService.sign({ mobile, expiresIn });

    return {
      expiresIn: +this.configService.get('JWT_EXPIRES_IN'),
      accessToken,
    };
  }
}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync(jwtConfig),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, ConfigService],
  exports: [PassportModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}

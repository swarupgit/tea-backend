import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<JwtModuleOptions> => ({
    secret: configService.getOrThrow('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: +configService.getOrThrow('JWT_EXPIRES_IN'),
    },
  }),
};

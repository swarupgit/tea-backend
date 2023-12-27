import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<MongooseModuleFactoryOptions> => ({
    uri: configService
      .getOrThrow<string>('MONGODB_URI')
      .replace('<username>', configService.get<string>('MONGODB_USERNAME'))
      .replace(
        '<password>',
        encodeURIComponent(configService.get<string>('MONGODB_PASSWORD')),
      )
      .replace('<db-name>', configService.get<string>('MONGODB_DB')),
  }),
};

import { CacheModule, Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

import { LoggerModule } from './logger/logger.module';
import { LogsMiddlewareService } from './share/logs-middleware.service';
import { ProductsModule } from './products/products.module';

import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),

        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),

        SESSION_SECRET: Joi.string().required(),

        RAINBOW_URL: Joi.string().required(),
        RAINBOW_IDENTIFIER: Joi.string().required(),
        RAINBOW_PASSWORD: Joi.string().required(),
      }),
    }),
    CacheModule.register({
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    LoggerModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddlewareService).forRoutes('*');
  }
}

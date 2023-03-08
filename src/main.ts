import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { createClient } from 'redis';
import { join } from 'path';

import * as session from 'express-session';
import * as passport from 'passport';
import * as createRedisStore from 'connect-redis';

import { CustomLogger } from './logger/custom-logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = app.get(Logger);
  const configService = app.get(ConfigService);

  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
  });

  redisClient.on('error', (err) => {
    logger.error('Could not establish a connection with redis. ' + err);
  });

  redisClient.on('connect', () => {
    logger.verbose('Connected to redis successfully');
  });

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      // cookie: { maxAge: 3600000 },
      cookie: { maxAge: 1000 * 60 * 10, sameSite: 'lax' },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useLogger(app.get(CustomLogger));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(3000, '0.0.0.0');
}
bootstrap();

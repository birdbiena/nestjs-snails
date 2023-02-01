import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import * as session from 'express-session';
import * as passport from 'passport';
import * as createRedisStore from 'connect-redis';

import { join } from 'path';
import { createClient } from 'redis';
import { CustomLogger } from './logger/custom-logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
  });

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      // cookie: { maxAge: 3600000 },
      cookie: { maxAge: 60000, sameSite: 'lax' },
    })
  );

  // app.useGlobalFilters(new HttpExceptionFilter());

  app.use(passport.initialize());
  app.use(passport.session());
  app.useLogger(app.get(CustomLogger));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(3000, '0.0.0.0');
}
bootstrap();

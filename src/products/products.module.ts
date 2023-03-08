import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ConfigModule } from '@nestjs/config';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import * as https from 'https';
import { HttpBaseService } from 'src/share/http-base';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, HttpBaseService],
})
export class ProductsModule {}

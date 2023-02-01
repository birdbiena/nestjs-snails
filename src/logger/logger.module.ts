import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger } from './custom-logger';

@Module({
  imports: [ConfigModule],
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}

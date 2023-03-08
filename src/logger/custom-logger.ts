import { ConsoleLogger, ConsoleLoggerOptions, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import logLevels from 'src/share/log-levels';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService
  ) {
    const environment = configService.get('NODE_ENV');
    super(context, {
      ...options,
      logLevels: logLevels(environment === 'production'),
    });
  }

  log(message: any, context?: string) {
    super.log.apply(this, [message, context]);
  }

  error(message: any, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);
  }

  warn(message: any, context?: string) {
    super.warn.apply(this, [message, context]);
  }

  debug(message: any, context?: string) {
    super.debug.apply(this, [message, context]);
  }

  verbose(message: any, context?: string) {
    super.debug.apply(this, [message, context]);
  }
}

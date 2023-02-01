import { LoggerService, LogLevel } from '@nestjs/common';
import pino from 'pino';

export default class MyLoggerService implements LoggerService {
  private readonly logger: pino.Logger;

  constructor(logger: pino.Logger) {
    this.logger = logger;
  }

  log(message: any, ...optionalParams: any[]) {

    this.logger.info(message);

    throw new Error('Method not implemented.');
  }

  error(message: any, ...optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }

  warn(message: any, ...optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }

  debug?(message: any, ...optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }

  verbose?(message: any, ...optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }

  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}

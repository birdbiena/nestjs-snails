import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import pino from 'pino';

@Injectable()
export default class MyLoggerService implements LoggerService {
  private readonly logger: pino.Logger;

  constructor(logger: pino.Logger) {
    this.logger = logger;
  }

  log(message: any, ..._optionalParams: any[]) {

    this.logger.info(message);

    throw new Error('Method not implemented.');
  }

  error(_message: any, ..._optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }

  warn(_message: any, ..._optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }

  debug?(_message: any, ..._optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }

  verbose?(_message: any, ..._optionalParams: any[]) {
    throw new Error('Method not implemented.');
  }

  setLogLevels?(_levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}

import { LogLevel } from '@nestjs/common';

export default function logLevels(isProduction: boolean): LogLevel[] {
  let logtype: LogLevel[] = ['log', 'warn', 'error'];

  if (!isProduction) {
    logtype.concat(['verbose', 'debug']);
  }

  return logtype;
}

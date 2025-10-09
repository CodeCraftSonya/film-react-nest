import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): string {
    const timestamp = new Date().toISOString();

    const base = {
      time: timestamp,
      level,
      message: this.stringify(message),
    };

    if (optionalParams.length > 0) {
      base['extra'] = this.stringify(optionalParams);
    }

    return (
      Object.entries(base)
        .map(([key, value]) => `${key}=${value}`)
        .join('\t') + '\n'
    );
  }

  private stringify(value: any): string {
    if (typeof value === 'string')
      return value.replace(/\t/g, ' ').replace(/\n/g, ' ');
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(
      this.formatMessage('error', message, ...optionalParams),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('warn', message, ...optionalParams),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('debug', message, ...optionalParams),
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('verbose', message, ...optionalParams),
    );
  }
}

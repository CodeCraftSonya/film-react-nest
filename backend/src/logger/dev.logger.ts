import { ConsoleLogger, Injectable } from '@nestjs/common';
import chalk from 'chalk';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: string, context?: string) {
    super.log(chalk.greenBright(message), context);
  }

  warn(message: string, context?: string) {
    super.warn(chalk.yellowBright(message), context);
  }

  error(message: string, stack?: string, context?: string) {
    super.error(chalk.redBright(message), stack, context);
  }

  debug(message: string, context?: string) {
    super.debug(chalk.cyanBright(message), context);
  }

  verbose(message: string, context?: string) {
    super.verbose(chalk.gray(message), context);
  }
}

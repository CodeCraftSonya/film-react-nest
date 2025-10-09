import { DevLogger } from './dev.logger';
import * as chalk from 'chalk';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(() => {
    logger = new DevLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен логировать сообщение зелёным цветом', () => {
    const spy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);

    logger.log('Server started');

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(chalk.greenBright('Server started')),
    );
  });

  it('должен логировать предупреждение жёлтым цветом', () => {
    const spy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);

    logger.warn('Cache miss');

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(chalk.yellowBright('Cache miss')),
    );
  });
});

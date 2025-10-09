import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('должен выводить лог в формате TSKV', () => {
    const spy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);

    logger.log('Test message', { user: 'alice' });

    expect(spy).toHaveBeenCalledTimes(1);

    const logged = (spy.mock.calls[0][0] as string).trim();

    expect(logged).toMatch(/^time=/);
    expect(logged).toContain('level=log');
    expect(logged).toContain('message=Test message');
    expect(logged).toContain('param0=user:alice');

    spy.mockRestore();
  });

  it('должен писать ошибки в stderr', () => {
    const spy = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true);

    logger.error('Something went wrong');

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toContain('level=error');

    spy.mockRestore();
  });
});

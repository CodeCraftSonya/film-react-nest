import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('должен логировать JSON строку', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger.log('Hello', { test: true });

    expect(spy).toHaveBeenCalled();

    const output = spy.mock.calls[0][0];
    const parsed = JSON.parse(output);

    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('Hello');
    expect(parsed.optionalParams[0]).toEqual({ test: true });

    spy.mockRestore();
  });
});

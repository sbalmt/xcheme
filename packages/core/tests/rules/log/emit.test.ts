import { Context, TextSource, EmitLogPattern, ExpectUnitPattern, LogType } from '../../../src/index';

/**
 * It can consume a sequence of characters 'a', 'b' and 'c', and emits a new log.
 */
const pattern = new EmitLogPattern(LogType.ERROR, 0xabc, new ExpectUnitPattern('a', 'b', 'c'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);

  // Check the log list.
  expect(context.logs).toHaveLength(1);
  expect(context.logs.count(LogType.ERROR)).toBe(1);

  const log = context.logs.get(0);
  expect(log.type).toBe(LogType.ERROR);
  expect(log.value).toBe(0xabc);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('azc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);

  // Check the error list.
  expect(context.logs).toHaveLength(0);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);

  // Check the error list.
  expect(context.logs).toHaveLength(0);
});

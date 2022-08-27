import { Context, TextSource, MapFlowPattern, EmitLogRoute, ExpectUnitPattern, LogType } from '../../../src/index';

/**
 * Routes map.
 */
const pattern = new MapFlowPattern(
  new EmitLogRoute(LogType.ERROR, 0x1aa, 'a'),
  new EmitLogRoute(LogType.WARNING, 0x2bb, new ExpectUnitPattern('c'), 'b')
);

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('bca', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(2);
  expect(source.length).toBe(1);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('ca', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(2);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);
});

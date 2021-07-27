import { Context, TextSource, MapFlowPattern, EmitNodeRoute, ExpectUnitPattern } from '../../../src/index';

/**
 * It can consume routes that contain patterns and prefixes indicating which flow should be triggered.
 */
const pattern = new MapFlowPattern(new EmitNodeRoute(0x1aa, 'a'), new EmitNodeRoute(0x2bb, new ExpectUnitPattern('c'), 'b'));

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

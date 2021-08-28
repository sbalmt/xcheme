import { Context, TextSource, MapFlowPattern, EmitSymbolRoute, ExpectUnitPattern } from '../../../src/index';

/**
 * Routes map.
 */
const pattern = new MapFlowPattern(
  new EmitSymbolRoute(0x1aa, new ExpectUnitPattern('a'), new ExpectUnitPattern('b'), '1'),
  new EmitSymbolRoute(0x2bb, new ExpectUnitPattern('c'), '2')
);

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('1ab2c', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(2);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(5);
  expect(source.length).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('1ac', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(2);
  expect(source.length).toBe(1);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);
});

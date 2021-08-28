import { Context, TextSource, MapFlowPattern, SetStateRoute, ExpectUnitPattern } from '../../../src/index';

/**
 * Routes map.
 */
const pattern = new MapFlowPattern(new SetStateRoute(0x1aa, 'a'), new SetStateRoute(0x2bb, new ExpectUnitPattern('c'), 'b'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('bca', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(2);
  expect(source.length).toBe(1);

  // Check the first output state.
  expect(source.output.state).toBe(0x2bb);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);

  // Check the final output state.
  expect(source.output.state).toBe(0x1aa);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('ca', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(2);

  // Check the output state.
  expect(source.output.state).toBe(0);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);

  // Check the output state.
  expect(source.output.state).toBe(0);
});

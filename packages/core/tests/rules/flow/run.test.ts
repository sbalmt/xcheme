import { Context, TextSource, RunFlowPattern, RangeUnitPattern } from '../../../src/index';

/**
 * It can consume a number between '0' and '9' in any order.
 */
const original = new RangeUnitPattern('0', '9');

/**
 * It can consume the 'original' pattern by using callback.
 */
const pattern = new RunFlowPattern(() => original);

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('09', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(1);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(2);
  expect(source.length).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('a01', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);
});

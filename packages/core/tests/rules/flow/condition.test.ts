import { Context, TextSource, ConditionFlowPattern, ExpectUnitPattern, RangeUnitPattern } from '../../../src/index';

/**
 * When the character '@' is found, it can consume a character between 'a' and 'z' in any order,
 * otherwise it can consume a number between '0' and '9' in any order.
 */
const pattern = new ConditionFlowPattern(new ExpectUnitPattern('@'), new RangeUnitPattern('a', 'z'), new RangeUnitPattern('0', '9'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('@a1', context);

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
  const source = new TextSource('@@a', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('@', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(0);
});

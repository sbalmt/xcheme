import { Context, TextSource, ExpectFlowPattern, AnyUnitPattern, RangeUnitPattern } from '../../../src/index';

/**
 * It can consume a number that precedes any character.
 */
const pattern = new ExpectFlowPattern(new AnyUnitPattern(), new RangeUnitPattern('0', '9'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('@1@9', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(2);
  expect(source.length).toBe(2);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(4);
  expect(source.length).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('@a', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(1);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('@', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(0);
});

import { Context, TextSource, RepeatFlowPattern, RangeUnitPattern } from '../../../src/index';

/**
 * It can consume a number between '0' and '9', and if the consumption was successful,
 * it will try to consume again whenever the pattern match.
 */
const pattern = new RepeatFlowPattern(new RangeUnitPattern('0', '9'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('0123456789a', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(10);
  expect(source.length).toBe(1);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('a0123456789', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(11);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);
});

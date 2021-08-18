import { Context, TextSource, NotFlowPattern, RangeUnitPattern } from '../../../src/index';

/**
 * It can consume a number between '0' and '9', and invert the consumption result.
 */
const pattern = new NotFlowPattern(new RangeUnitPattern('0', '9'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('a', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(1);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('0', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(0);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);
});

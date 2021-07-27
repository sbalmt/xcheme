import { Context, TextSource, SetValuePattern, ExpectUnitPattern } from '../../../src/index';

/**
 * It can consume a sequence of characters 'a', 'b' and 'c' and change the current output value.
 */
const pattern = new SetValuePattern(0xabc, new ExpectUnitPattern('a', 'b', 'c'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);

  // Check the output value.
  expect(source.output.value).toBe(0xabc);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('azc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);

  // Check the token list.
  expect(context.tokens).toHaveLength(0);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);

  // Check the token list.
  expect(context.tokens).toHaveLength(0);
});

import { Context, TextSource, AnyUnitPattern } from '../../../src/index';

/**
 * It can consume any character.
 */
const pattern = new AnyUnitPattern();

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);

  // Test the second consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(2);
  expect(source.length).toBe(1);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
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

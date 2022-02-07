import { Context, TextSource, UncaseTransformPattern, ExpectUnitPattern } from '../../../src/index';

/**
 * It can consume a sequence of characters 'a', 'b' and 'c', disregarding the character case.
 */
const pattern = new UncaseTransformPattern(new ExpectUnitPattern('a', 'b', 'c'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('aBc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('azc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
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

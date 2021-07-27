import { Context, TextSource, EndFlowPattern } from '../../../src/index';

/**
 * It can detect the end of the consumption source.
 */
const pattern = new EndFlowPattern();

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
});

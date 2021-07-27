import { Context, TextSource, StaticFlowPattern } from '../../../src/index';

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);
  const pattern = new StaticFlowPattern(true);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);
  const pattern = new StaticFlowPattern(false);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
});

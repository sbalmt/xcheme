import { Context, TextSource, PeekFlowPattern, RangeUnitPattern } from '../../../src/index';

/**
 * It can consume a number range from 0 to 9.
 */
const pattern = new PeekFlowPattern(new RangeUnitPattern('0', '9'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('123', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('@23', context);

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

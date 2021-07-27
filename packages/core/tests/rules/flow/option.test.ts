import { Context, TextSource, OptionFlowPattern, RangeUnitPattern } from '../../../src/index';

/**
 * It can make the consumption of a number between '0' and '9' optional.
 */
const pattern = new OptionFlowPattern(new RangeUnitPattern('0', '9'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('1a', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(1);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(1);
});

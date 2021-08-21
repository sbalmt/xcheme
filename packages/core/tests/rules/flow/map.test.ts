import { Context, TextSource, MapFlowPattern, ChooseFlowPattern, RangeUnitPattern, Route } from '../../../src/index';

/**
 * It can consume routes that contain patterns and prefixes indicating which flow should be triggered.
 */
const pattern = new MapFlowPattern(
  new Route(new RangeUnitPattern('0', '7'), '0'),
  new Route(new RangeUnitPattern('0', '1'), '0', 'b'),
  new Route(new ChooseFlowPattern(new RangeUnitPattern('0', '9'), new RangeUnitPattern('a', 'f')), '0', 'x')
);

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('0b10xf00', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(5);

  // Test the second consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(6);
  expect(source.length).toBe(2);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(8);
  expect(source.length).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('0b@', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(2);
  expect(source.length).toBe(1);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);
});

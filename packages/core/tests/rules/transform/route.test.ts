import { Context, TextSource, MapFlowPattern, UncaseTransformRoute, ExpectUnitPattern } from '../../../src/index';

/**
 * Routes map.
 */
const pattern = new MapFlowPattern(
  new UncaseTransformRoute(new ExpectUnitPattern('b'), 'a'),
  new UncaseTransformRoute(new ExpectUnitPattern('d', 'e'), 'c')
);

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('aBcDE', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(2);
  expect(source.length).toBe(3);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(5);
  expect(source.length).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('aDE', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);
});

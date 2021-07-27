import { Context, TextSource, ScopeSymbolPattern, ExpectUnitPattern } from '../../../src/index';

/**
 * It can create an inner symbol table and consume a sequence of characters 'a', 'b' and 'c'.
 * Any symbol being emitted by the inner patterns will be placed in this new symbol table.
 */
const pattern = new ScopeSymbolPattern(new ExpectUnitPattern('a', 'b', 'c'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('abcabc', context);

  // Test the first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(3);

  // Test the final consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(6);
  expect(source.length).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('azcabc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(5);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);
});

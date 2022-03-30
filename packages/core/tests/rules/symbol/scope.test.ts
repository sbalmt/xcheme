import {
  Context,
  TextSource,
  ScopeSymbolPattern,
  EmitSymbolPattern,
  ExpectUnitPattern,
  ExpectFlowPattern
} from '../../../src/index';

/**
 * Consume the 'a' character and emits a new symbol into the current symbol table.
 */
const symbolA = new EmitSymbolPattern(0xa, new ExpectUnitPattern('a'));

/**
 * Consume the 'c' character and emits a new symbol into the current symbol table.
 */
const symbolC = new EmitSymbolPattern(0xc, new ExpectUnitPattern('c'));

/**
 * Consume the symbol A in a new symbol scope, then consume the character 'b', and the symbol C in another
 * symbol scope, after it emits a new symbol for the character 'b' linking both symbol scopes.
 */
const pattern = new ExpectFlowPattern(
  new ScopeSymbolPattern(symbolA),
  new EmitSymbolPattern(0xb, new ExpectUnitPattern('b'), new ScopeSymbolPattern(symbolC))
);

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);

  // Check the generated symbol record.
  const table = source.output.table!;
  expect(table).toBeDefined();
  expect(table).toHaveLength(1);
  expect(table.has('b')).toBeTruthy();

  // Check the generated sub symbol table.
  const record = table.get('b')!;
  expect(record).toBeDefined();
  expect(record.link).toBeDefined();

  // Check the generated sub symbol records.
  const link = record.link!;
  expect(link).toBeDefined();
  expect(link).toHaveLength(2);
  expect(link.has('a')).toBeTruthy();
  expect(link.has('c')).toBeTruthy();
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('azc', context);

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

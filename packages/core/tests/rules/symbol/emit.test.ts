import { Context, TextSource, EmitSymbolPattern, ExpectUnitPattern } from '../../../src/index';

/**
 * It can consume a sequence of characters 'a', 'b' and 'c' and emits a new symbol into the current symbol table.
 */
const pattern = new EmitSymbolPattern(0xabc, new ExpectUnitPattern('a'), new ExpectUnitPattern('b', 'c'));

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

  const record = table.getRecord('a')!;
  expect(record).toBeDefined();
  expect(record.value).toBe(0xabc);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('azc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);

  // Check the generated symbol record.
  const table = source.output.table!;
  expect(table).toBeDefined();
  expect(table).toHaveLength(0);
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);

  // Check the generated symbol record.
  const table = source.output.table!;
  expect(table).toBeDefined();
  expect(table).toHaveLength(0);
});

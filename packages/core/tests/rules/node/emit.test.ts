import { Context, Nodes, TextSource, EmitNodePattern, ExpectUnitPattern } from '../../../src/index';

/**
 * It can consume a sequence of characters 'a', 'b' and 'c' and emits a new node into the main AST.
 */
const pattern = new EmitNodePattern(0xabc, Nodes.Left, new ExpectUnitPattern('a', 'b', 'c'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);

  // Check the generated node.
  const node = context.node.next!;
  expect(node).toBeDefined();
  expect(node.value).toBe(0xabc);
  expect(node.table).toBe(context.table);
  expect(node.left).toBeUndefined();
  expect(node.right).toBeUndefined();
  expect(node.next).toBeUndefined();

  const fragment = node.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe('abc');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(3);
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('azc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);

  // Check the generated node.
  expect(context.node.next).toBeUndefined();
});

test('Consume eof', () => {
  const context = new Context('test');
  const source = new TextSource('', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(0);
  expect(source.length).toBe(0);

  // Check the generated node.
  expect(context.node.next).toBeUndefined();
});

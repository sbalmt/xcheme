import { Context, Nodes, Node, TextSource, PivotNodePattern, AppendNodePattern, ExpectUnitPattern } from '../../../src/index';

/**
 * It can consume a sequence of characters 'a', 'b' and 'c' and append a new node into the current AST.
 */
const node = new AppendNodePattern(0xabc, Nodes.Left, Nodes.Left, new ExpectUnitPattern('a', 'b', 'c'));

/**
 * It can consume  the character '@' and the 'node' pattern, then it pivots a new node into the current AST.
 */
const pattern = new PivotNodePattern(0x123, Nodes.Right, Nodes.Left, new ExpectUnitPattern('@'), node);

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('@abc', context);
  let fragment;

  // Set the fake node before starting.
  source.output.node = new Node(source.fragment, 0xfff, context.table);

  // Test the consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(4);
  expect(source.length).toBe(0);

  // Check the pivot node.
  const pivot = source.output.node!;
  expect(pivot).toBeDefined();
  expect(pivot.value).toBe(0x123);
  expect(pivot.table).toBe(context.table);
  expect(pivot.left).toBeDefined();
  expect(pivot.right).toBeDefined();
  expect(pivot.next).toBeUndefined();

  fragment = pivot.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe('@');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);

  // Check the fake node.
  const fake = pivot.left!;
  expect(fake).toBeDefined();
  expect(fake.value).toBe(0xfff);
  expect(fake.table).toBe(context.table);
  expect(fake.left).toBeUndefined();
  expect(fake.right).toBeUndefined();
  expect(fake.next).toBeUndefined();

  // Check the child node.
  const child = pivot.right!;
  expect(child).toBeDefined();
  expect(child.value).toBe(0xabc);
  expect(child.table).toBe(context.table);
  expect(child.left).toBeUndefined();
  expect(child.right).toBeUndefined();
  expect(child.next).toBeUndefined();

  fragment = child.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe('abc');
  expect(fragment.begin).toBe(1);
  expect(fragment.end).toBe(4);
  expect(fragment.location.column).toBe(1);
  expect(fragment.location.line).toBe(0);
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('@azc', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(2);
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

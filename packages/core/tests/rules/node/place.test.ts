import { Context, Nodes, Node, TextSource, PlaceNodePattern, AppendNodePattern, ExpectUnitPattern } from '../../../src/index';

/**
 * It can consume a sequence of characters 'a', 'b' and 'c' and append a new node into the current AST.
 */
const pattern = new PlaceNodePattern(
  Nodes.Right,
  new AppendNodePattern(0xabc, Nodes.Right, Nodes.Left, new ExpectUnitPattern('a', 'b', 'c'))
);

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);
  let fragment;

  // Set the fake node before starting.
  source.output.node = new Node(source.fragment, 0xfff, context.table);

  // Test the consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);

  // Check the fake node.
  const fake = source.output.node!;
  expect(fake).toBeDefined();
  expect(fake.value).toBe(0xfff);
  expect(fake.table).toBe(context.table);
  expect(fake.left).toBeUndefined();
  expect(fake.right).toBeDefined();
  expect(fake.next).toBeUndefined();

  // Check the child node.
  const child = fake.right!;
  expect(child).toBeDefined();
  expect(child.value).toBe(0xabc);
  expect(child.table).toBe(context.table);
  expect(child.left).toBeUndefined();
  expect(child.right).toBeUndefined();
  expect(child.next).toBeUndefined();

  fragment = child.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe('abc');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(3);
  expect(fragment.location.line.begin).toBe(0);
  expect(fragment.location.line.end).toBe(0);
  expect(fragment.location.column.begin).toBe(0);
  expect(fragment.location.column.end).toBe(3);
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

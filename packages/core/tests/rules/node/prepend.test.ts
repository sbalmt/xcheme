import { Context, Nodes, Node, TextSource, PrependNodePattern, ExpectUnitPattern } from '../../../src/index';

/**
 * It can consume a sequence of characters '@', 'a' and 'b' and prepend a new node '@' into the current AST.
 */
const pattern = new PrependNodePattern(0xabc, Nodes.Right, Nodes.Next, new ExpectUnitPattern('@'), new ExpectUnitPattern('a', 'b'));

test('Consume success', () => {
  const context = new Context('test');
  const source = new TextSource('@ab', context);
  let fragment;

  // Set the fake node before starting.
  source.output.node = new Node(source.fragment, context.table, 0xfff);

  // Test first consumption.
  expect(pattern.consume(source)).toBeTruthy();
  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);

  // Check the child node.
  const child = source.output.node!;
  expect(child).toBeDefined();
  expect(child.value).toBe(0xabc);
  expect(child.table).toBe(context.table);
  expect(child.left).toBeUndefined();
  expect(child.right).toBeUndefined();
  expect(child.next).toBeDefined();

  fragment = child.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe('@');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);

  // Check the fake node.
  const fake = child.next!;
  expect(fake).toBeDefined();
  expect(fake.value).toBe(0xfff);
  expect(fake.table).toBe(context.table);
  expect(fake.left).toBeUndefined();
  expect(fake.right).toBeUndefined();
  expect(fake.next).toBeUndefined();
});

test('Consume failure', () => {
  const context = new Context('test');
  const source = new TextSource('@az', context);

  // Test the consumption.
  expect(pattern.consume(source)).toBeFalsy();
  expect(source.offset).toBe(2);
  expect(source.length).toBe(1);

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

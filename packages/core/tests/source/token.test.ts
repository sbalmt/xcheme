import { Exception, Context, Fragment, Location, Range } from '../../src/index';
import { TokenSource, TokenList, Token, Node, Record } from '../../src/index';

const text = 'abc';

const tokens = new TokenList([
  new Token(new Fragment(text, 0, 1, new Location('', new Range(0, 0), new Range(0, 1))), 0x1a),
  new Token(new Fragment(text, 1, 2, new Location('', new Range(0, 1), new Range(0, 1))), 0x2b),
  new Token(new Fragment(text, 2, 3, new Location('', new Range(1, 1), new Range(1, 2))), 0x3c)
]);

test('Default source state', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);

  // Test the default source state.
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
  expect(source.value).toBe(0x1a);

  // Test the default fragment state.
  const fragment = source.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);

  const location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);

  // Test the default output state.
  const output = source.output;
  expect(output).toBeDefined();
  expect(output.table).toBeDefined();
  expect(output.value).toBeUndefined();
  expect(output.node).toBeUndefined();
});

test('Next source state', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);
  let fragment, location;

  // Test the initial state.
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
  expect(source.value).toBe(0x1a);

  fragment = source.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);

  location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);

  // Test the next state.
  source.next();

  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);
  expect(source.value).toBe(0x2b);

  fragment = source.fragment;
  expect(fragment.data).toBe('b');
  expect(fragment.begin).toBe(1);
  expect(fragment.end).toBe(2);

  location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(1);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);

  // Test the next state.
  source.next();

  expect(source.offset).toBe(2);
  expect(source.length).toBe(1);
  expect(source.value).toBe(0x3c);

  fragment = source.fragment;
  expect(fragment.data).toBe('c');
  expect(fragment.begin).toBe(2);
  expect(fragment.end).toBe(3);

  location = fragment.location;
  expect(location.line.begin).toBe(1);
  expect(location.line.end).toBe(1);
  expect(location.column.begin).toBe(1);
  expect(location.column.end).toBe(2);

  // Test the last state.
  source.next();

  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);
  expect(() => source.value).toThrow(new Exception("There's no token to get."));

  fragment = source.fragment;
  expect(fragment.data).toBe('c');
  expect(fragment.begin).toBe(2);
  expect(fragment.end).toBe(3);

  location = fragment.location;
  expect(location.line.begin).toBe(1);
  expect(location.line.end).toBe(1);
  expect(location.column.begin).toBe(1);
  expect(location.column.end).toBe(2);
});

test('Save/Discard source state', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);
  let fragment, location;

  // Test the initial state.
  fragment = source.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);

  location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);

  // Save state.
  source.save();

  // Move to the last state.
  source.next();
  source.next();
  source.next();

  fragment = source.fragment;
  expect(fragment.data).toBe('abc');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(3);

  location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(1);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(2);

  // Discard state.
  source.discard();
});

test('Save/Restore/Discard source state', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);
  let fragment, location;

  // Test the initial state.
  fragment = source.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);

  location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);

  // Save state.
  source.save();

  // Move to the next state.
  source.next();

  // Restore state.
  source.restore();

  // Test the restored state.
  fragment = source.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);

  location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);

  // Discard state.
  source.discard();

  // Test no more states to restore.
  expect(() => source.restore()).toThrow(new Exception("There's no state to restore."));
});

test('Open/Close symbol table', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);
  let table;

  // Test the default symbol table state.
  table = context.table;
  expect(table.parent).toBeUndefined();
  expect(table.names).toHaveLength(0);

  // Open symbol table.
  source.expand();

  // Emit a new record to the output symbol table.
  source.emit(new Record(source.fragment, 123, context.node));

  // Test the output symbol table state.
  table = source.output.table!;
  expect(table.parent).toBeDefined();
  expect(table.names).toHaveLength(1);

  // Close the current symbol table.
  source.collapse();

  // Test the default symbol table state.
  table = context.table;
  expect(table.parent).toBeUndefined();
  expect(table.names).toHaveLength(0);

  // Test no more symbol tabes to close.
  expect(() => source.collapse()).toThrow(new Exception("There's no table to collapse."));
});

test('Emit token', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);

  // Test token emission.
  source.emit(new Token(source.fragment, 123));
  expect(context.tokens).toHaveLength(1);

  // Test resulting token.
  const token = context.tokens.get(0);
  expect(token.value).toBe(123);

  // Test resulting token fragment.
  const fragment = token.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);

  const location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);
});

test('Emit node', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);

  // Test node emission.
  source.emit(new Node(source.fragment, 123, context.table));
  expect(context.node.next).toBeDefined();

  // Test resulting node.
  const node = context.node.next!;
  expect(node.fragment).toBeDefined();
  expect(node.table).toBeDefined();
  expect(node.left).toBeUndefined();
  expect(node.right).toBeUndefined();
  expect(node.next).toBeUndefined();
  expect(node.value).toBe(123);

  // Test resulting node fragment.
  const fragment = node.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);

  const location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);
});

test('Emit record', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);

  // Test record emission.
  source.emit(new Record(source.fragment, 123, context.node));

  // Test symbol table state.
  const table = context.table;
  expect(table.parent).toBeUndefined();
  expect(table.names).toHaveLength(1);

  // Test resulting record.
  const record = table.get('a')!;
  expect(record.fragment).toBeDefined();
  expect(record.node).toBeDefined();
  expect(record.value).toBe(123);

  // Test resulting record fragment.
  const fragment = record.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);

  const location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);

  // Test duplicate record.
  expect(() => source.emit(new Record(source.fragment, 123, context.node))).toThrow(
    new Exception('Unable to add records with duplicate name.')
  );
});

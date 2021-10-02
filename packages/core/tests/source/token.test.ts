import { Context, TokenSource, Token, Node, Record } from '../../src/index';
import Fragment from '../../src/core/fragment';
import Location from '../../src/core/location';

const text = 'abc';

const tokens = [
  new Token(new Fragment(text, 0, 1, new Location(0, 0)), 0x1a),
  new Token(new Fragment(text, 1, 2, new Location(0, 1)), 0x2b),
  new Token(new Fragment(text, 2, 3, new Location(0, 2)), 0x3c)
];

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
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);

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
  let fragment;

  // Test the initial state.
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
  expect(source.value).toBe(0x1a);

  fragment = source.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);

  // Test the next state.
  source.nextState();

  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);
  expect(source.value).toBe(0x2b);

  fragment = source.fragment;
  expect(fragment.data).toBe('b');
  expect(fragment.begin).toBe(1);
  expect(fragment.end).toBe(2);
  expect(fragment.location.column).toBe(1);
  expect(fragment.location.line).toBe(0);

  // Test the next state.
  source.nextState();

  expect(source.offset).toBe(2);
  expect(source.length).toBe(1);
  expect(source.value).toBe(0x3c);

  fragment = source.fragment;
  expect(fragment.data).toBe('c');
  expect(fragment.begin).toBe(2);
  expect(fragment.end).toBe(3);
  expect(fragment.location.column).toBe(2);
  expect(fragment.location.line).toBe(0);

  // Test the last state.
  source.nextState();

  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);
  expect(() => source.value).toThrow("There's no value to get.");

  fragment = source.fragment;
  expect(fragment.data).toBe('c');
  expect(fragment.begin).toBe(2);
  expect(fragment.end).toBe(3);
  expect(fragment.location.column).toBe(2);
  expect(fragment.location.line).toBe(0);
});

test('Save/Discard source state', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);
  let fragment;

  // Test the initial state.
  fragment = source.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);

  // Save state.
  source.saveState();

  // Move to the last state.
  source.nextState();
  source.nextState();
  source.nextState();

  fragment = source.fragment;
  expect(fragment.data).toBe('abc');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(3);
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);

  // Discard state.
  source.discardState();
});

test('Save/Restore/Discard source state', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);
  let fragment;

  // Test the initial state.
  fragment = source.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);

  // Save state.
  source.saveState();

  // Move to the next state.
  source.nextState();

  // Restore state.
  source.restoreState();

  // Test the restored state.
  fragment = source.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);

  // Discard state.
  source.discardState();

  // Test no more states to restore.
  expect(() => source.restoreState()).toThrow("There's no state to restore.");
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
  source.openTable();

  // Emit a new record to the output symbol table.
  source.emit(new Record(source.fragment, 123, context.node));

  // Test the output symbol table state.
  table = source.output.table!;
  expect(table.parent).toBeDefined();
  expect(table.names).toHaveLength(1);

  // Close the current symbol table.
  source.closeTable();

  // Test the default symbol table state.
  table = context.table;
  expect(table.parent).toBeUndefined();
  expect(table.names).toHaveLength(0);

  // Test no more symbol tabes to close.
  expect(() => source.closeTable()).toThrow("There's no parent symbol table to collapse.");
});

test('Emit token', () => {
  const context = new Context('test');
  const source = new TokenSource(tokens, context);

  // Test token emission.
  source.emit(new Token(source.fragment, 123));
  expect(context.tokens).toHaveLength(1);
  expect(context.tokens[0]).toBeDefined();

  // Test resulting token.
  const token = context.tokens[0];
  expect(token.value).toBe(123);

  // Test resulting token fragment.
  const fragment = token.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);
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
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);
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
  expect(fragment.location.column).toBe(0);
  expect(fragment.location.line).toBe(0);

  // Test duplicate record.
  expect(() => source.emit(new Record(source.fragment, 123, context.node))).toThrow(
    'Unable to add records with duplicate fragment data.'
  );
});

import { Exception, Context, TextSource, Token, Node, SymbolRecord } from '../../src/index';

test('Default source state', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

  // Test the default source state.
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
  expect(source.value).toBe('a');

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
  expect(location.column.end).toBe(0);

  // Test the default output state.
  const output = source.output;
  expect(output).toBeDefined();
  expect(output.value).toBeUndefined();
  expect(output.node).toBeUndefined();
});

test('Next source state', () => {
  const context = new Context('test');
  const source = new TextSource('a\nb', context);
  let fragment, location;

  // Test the initial state.
  expect(source.offset).toBe(0);
  expect(source.length).toBe(3);
  expect(source.value).toBe('a');

  fragment = source.fragment;
  expect(fragment.data).toBe('a');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(1);

  location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(0);

  // Test the next state.
  source.next();

  expect(source.offset).toBe(1);
  expect(source.length).toBe(2);
  expect(source.value).toBe('\n');

  fragment = source.fragment;
  expect(fragment.data).toBe('\n');
  expect(fragment.begin).toBe(1);
  expect(fragment.end).toBe(2);

  location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
  expect(location.column.begin).toBe(1);
  expect(location.column.end).toBe(1);

  // Test the next state.
  source.next();

  expect(source.offset).toBe(2);
  expect(source.length).toBe(1);
  expect(source.value).toBe('b');

  fragment = source.fragment;
  expect(fragment.data).toBe('b');
  expect(fragment.begin).toBe(2);
  expect(fragment.end).toBe(3);

  location = fragment.location;
  expect(location.line.begin).toBe(1);
  expect(location.line.end).toBe(1);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(0);

  // Test the last state.
  source.next();

  expect(source.offset).toBe(3);
  expect(source.length).toBe(0);
  expect(() => source.value).toThrow(new Exception("There's no character to get."));

  fragment = source.fragment;
  expect(fragment.data).toBe('');
  expect(fragment.begin).toBe(3);
  expect(fragment.end).toBe(3);

  location = fragment.location;
  expect(location.line.begin).toBe(1);
  expect(location.line.end).toBe(1);
  expect(location.column.begin).toBe(1);
  expect(location.column.end).toBe(1);
});

test('Save/Discard source state', () => {
  const context = new Context('test');
  const source = new TextSource('a\nb', context);
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
  expect(location.column.end).toBe(0);

  // Save state.
  source.save();

  // Move to the last state.
  source.next();
  source.next();
  source.next();

  fragment = source.fragment;
  expect(fragment.data).toBe('a\nb');
  expect(fragment.begin).toBe(0);
  expect(fragment.end).toBe(3);

  location = fragment.location;
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(1);
  expect(location.column.begin).toBe(0);
  expect(location.column.end).toBe(1);

  // Discard state.
  source.discard();
});

test('Save/Restore/Discard source state', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);
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
  expect(location.column.end).toBe(0);

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
  expect(location.column.end).toBe(0);

  // Discard state.
  source.discard();

  // Test no more states to restore.
  expect(() => source.restore()).toThrow(new Exception("There's no state to restore."));
});

test('Open/Close symbol table', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);
  let table;

  // Test the default symbol table state.
  table = context.table;
  expect(table.parent).toBeUndefined();
  expect(table.names).toHaveLength(0);

  // Open symbol table.
  source.scope.push();

  // Emit a new record to the output symbol table.
  source.scope.emit(new SymbolRecord(source.fragment, 123, context.node));

  // Test the output symbol table state.
  table = source.scope.table;
  expect(table.parent).toBeDefined();
  expect(table.names).toHaveLength(1);

  // Close the current symbol table.
  source.scope.pop();

  // Test the default symbol table state.
  table = context.table;
  expect(table.parent).toBeUndefined();
  expect(table.names).toHaveLength(0);

  // Test no more symbol tabes to close.
  expect(() => source.scope.pop()).toThrow(new Exception("There's no scope to remove."));
});

test('Emit token', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

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
  expect(location.column.end).toBe(0);
});

test('Emit node', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

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
  expect(location.column.end).toBe(0);
});

test('Emit record', () => {
  const context = new Context('test');
  const source = new TextSource('abc', context);

  // Test record emission.
  source.scope.emit(new SymbolRecord(source.fragment, 123, context.node));

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
  expect(location.column.end).toBe(0);

  // Test duplicate record.
  expect(() => source.scope.emit(new SymbolRecord(source.fragment, 123, context.node))).toThrow(
    new Exception('Unable to add records with duplicate name.')
  );
});

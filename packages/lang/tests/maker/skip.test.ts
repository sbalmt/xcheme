import * as Lang from '../../src/index';
import * as Helper from './helper';

test('Skip referring an undefined identifier', () => {
  const input = 'skip TOKEN;';
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Skip referring a token (reference error)', () => {
  const input = "token TOKEN as '@'; skip TOKEN;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_TOKEN_REFERENCE]);
});

test('Skip referring a node (reference error)', () => {
  const input = "node NODE as '@'; skip NODE;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_NODE_REFERENCE]);
});

test('Skip referring an alias node (reference error)', () => {
  const input = "alias node NODE as '@'; skip NODE;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]);
});

test('Skip referring a token map entry (reference error)', () => {
  const input = "token TOKEN as map { <100> A as 'a' }; skip TOKEN.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Skip referring an alias token map entry (reference error)', () => {
  const input = "alias token TOKEN as map { <100> A as 'a' }; skip TOKEN.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Skip referring a node map entry (reference error)', () => {
  const input = "node NODE as map { <100> A as 'a' }; skip NODE.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Skip referring an alias node map entry (reference error)', () => {
  const input = "alias node NODE as map { <100> A as 'a' }; skip NODE.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Skip with an identified map', () => {
  const input = "skip map { <100> A as 'a' };";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.UNSUPPORTED_IDENTITY]);
});

test('Skip with a dependency (alias token reference)', () => {
  const input = "skip ALIAS; alias token ALIAS as '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting skip.
  const skip = project.symbols.get('@SKIP0')!;
  expect(skip).toBeDefined();
  expect(skip.value).toBe(Lang.Parser.Symbols.Skip);
  expect(skip.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(skip.data.exported).toBeFalsy();
  expect(skip.data.imported).toBeFalsy();
  expect(skip.data.dynamic).toBeFalsy();
  expect(skip.data.identity).toBe(0);
  expect(skip.data.dependencies).toHaveLength(1);
  expect(skip.data.dependents).toHaveLength(0);

  // Check the resulting dependency.
  const [alias] = skip.data.dependencies;
  expect(alias).toBeDefined();
  expect(alias.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(alias.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(alias.data.exported).toBeFalsy();
  expect(alias.data.imported).toBeFalsy();
  expect(alias.data.dynamic).toBeFalsy();
  expect(alias.data.identifier).toBe('ALIAS');
  expect(alias.data.identity).toBe(0);
  expect(alias.data.dependencies).toHaveLength(0);
  expect(alias.data.dependents).toHaveLength(1);
});

test('Skip with an imported pattern', () => {
  const input = "import './module1'; skip EXTERNAL_TOKEN1;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting skip.
  const skip = project.symbols.get('@SKIP0')!;
  expect(skip).toBeDefined();
  expect(skip.value).toBe(Lang.Parser.Symbols.Skip);
  expect(skip.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(skip.data.exported).toBeFalsy();
  expect(skip.data.imported).toBeFalsy();
  expect(skip.data.dynamic).toBeFalsy();
  expect(skip.data.identity).toBe(0);
  expect(skip.data.dependencies).toHaveLength(1);
  expect(skip.data.dependents).toHaveLength(0);

  // Check the imported dependency.
  const [imported] = skip.data.dependencies;
  expect(imported).toBeDefined();
  expect(imported.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(imported.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(imported.data.exported).toBeFalsy();
  expect(imported.data.imported).toBeTruthy();
  expect(imported.data.dynamic).toBeFalsy();
  expect(imported.data.identifier).toBe('EXTERNAL_TOKEN1');
  expect(imported.data.identity).toBe(1010);
  expect(imported.data.dependencies).toHaveLength(1);
  expect(imported.data.dependents).toHaveLength(1);
});

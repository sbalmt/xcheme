import * as Helper from './helper';
import * as Lang from '../../src/index';

test('Skip referring an undefined identifier', () => {
  Helper.makeError(new Lang.LiveCoder(), 'skip TOKEN;', [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Skip referring a token (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN as '@'; skip TOKEN;", [Lang.Errors.INVALID_TOKEN_REFERENCE]);
});

test('Skip referring a node (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as '@'; skip NODE;", [Lang.Errors.INVALID_NODE_REFERENCE]);
});

test('Skip referring an alias node (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias node NODE as '@'; skip NODE;", [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]);
});

test('Skip referring a token map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN as map { <100> A as 'a' }; skip TOKEN.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Skip referring an alias token map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias token TOKEN as map { <100> A as 'a' }; skip TOKEN.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Skip referring a node map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as map { <100> A as 'a' }; skip NODE.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Skip referring an alias node map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias node NODE as map { <100> A as 'a' }; skip NODE.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Skip with an identified map', () => {
  Helper.makeError(new Lang.LiveCoder(), "skip map { <100> A as 'a' };", [Lang.Errors.UNSUPPORTED_IDENTITY]);
});

test('Skip with a dependency (alias token reference)', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip ALIAS; alias token ALIAS as '@';");

  // Check the resulting skip.
  const skip = project.local.get('@SKIP0')!;
  expect(skip).toBeDefined();
  expect(skip.type).toBe(Lang.Entries.Types.Skip);
  expect(skip.origin).toBe(Lang.Entries.Origins.User);
  expect(skip.alias).toBeFalsy();
  expect(skip.exported).toBeFalsy();
  expect(skip.imported).toBeFalsy();
  expect(skip.dynamic).toBeFalsy();
  expect(skip.identity).toBe(0);
  expect(skip.references).toBe(0);
  expect(skip.dependencies).toHaveLength(1);
  expect(skip.primary).toBeUndefined();

  // Check the resulting dependency.
  const [alias] = skip.dependencies;
  expect(alias).toBeDefined();
  expect(alias.type).toBe(Lang.Entries.Types.Token);
  expect(alias.origin).toBe(Lang.Entries.Origins.User);
  expect(alias.alias).toBeTruthy();
  expect(alias.exported).toBeFalsy();
  expect(alias.imported).toBeFalsy();
  expect(alias.dynamic).toBeFalsy();
  expect(alias.identifier).toBe('ALIAS');
  expect(alias.identity).toBe(1);
  expect(alias.references).toBe(1);
  expect(alias.dependencies).toHaveLength(0);
  expect(alias.primary).toBeUndefined();
});

test('Skip with an imported pattern', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "import './module1'; skip EXTERNAL_TOKEN1;");

  // Check the resulting skip.
  const skip = project.local.get('@SKIP6')!;
  expect(skip).toBeDefined();
  expect(skip.type).toBe(Lang.Entries.Types.Skip);
  expect(skip.origin).toBe(Lang.Entries.Origins.User);
  expect(skip.alias).toBeFalsy();
  expect(skip.exported).toBeFalsy();
  expect(skip.imported).toBeFalsy();
  expect(skip.dynamic).toBeFalsy();
  expect(skip.identity).toBe(6);
  expect(skip.references).toBe(0);
  expect(skip.dependencies).toHaveLength(1);
  expect(skip.primary).toBeUndefined();

  // Check the imported dependency.
  const [imported] = skip.dependencies;
  expect(imported).toBeDefined();
  expect(imported.type).toBe(Lang.Entries.Types.Token);
  expect(imported.origin).toBe(Lang.Entries.Origins.User);
  expect(imported.alias).toBeTruthy();
  expect(imported.exported).toBeFalsy();
  expect(imported.imported).toBeTruthy();
  expect(imported.dynamic).toBeFalsy();
  expect(imported.identifier).toBe('EXTERNAL_TOKEN1');
  expect(imported.identity).toBe(1010);
  expect(imported.references).toBe(1);
  expect(imported.dependencies).toHaveLength(1);
  expect(imported.primary).toBeUndefined();
});

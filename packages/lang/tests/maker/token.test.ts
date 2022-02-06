import * as Helper from './helper';
import * as Lang from '../../src/index';

test('Token referring an undefined identifier', () => {
  Helper.makeError(new Lang.LiveCoder(), 'token TOKEN as ALIAS;', [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Token referring a node (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as '@'; token TOKEN as NODE;", [Lang.Errors.INVALID_NODE_REFERENCE]);
});

test('Token referring an alias node (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias node NODE as '@'; token TOKEN as NODE;", [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]);
});

test('Token referring a token map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN1 as map { <100> A as 'a' }; token TOKEN2 as TOKEN1.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Token referring an alias token map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias token TOKEN1 as map { <100> A as 'a' }; token TOKEN2 as TOKEN1.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Token referring a node map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as map { <100> A as 'a' }; token TOKEN as NODE.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Token referring an alias node map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias node NODE as map { <100> A as 'a' }; token TOKEN as NODE.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Loose token already defined (token collision)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as '@'; token TOKEN as '@';", [Lang.Errors.TOKEN_COLLISION]);
});

test('Loose token range already defined (token collision)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as from '0' to '9'; token TOKEN as from '0' to '9';", [
    Lang.Errors.TOKEN_COLLISION
  ]);
});

test('Loose token map entry already defined (token collision)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as map { '@' }; token TOKEN as '@';", [Lang.Errors.TOKEN_COLLISION]);
});

test('Token already defined (token collision)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN1 as '@'; token TOKEN2 as '@';", [Lang.Errors.TOKEN_COLLISION]);
});

test('Token range already defined (token collision)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN1 as from '0' to '9'; token TOKEN2 as from '0' to '9';", [
    Lang.Errors.TOKEN_COLLISION
  ]);
});

test('Token map entry already defined (token collision)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN1 as '@'; token TOKEN2 as map { '@' };", [Lang.Errors.TOKEN_COLLISION]);
});

test('Token with a dependency (alias token reference)', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias token ALIAS as '@'; token<1010> TOKEN as ALIAS;");

  // Check the resulting token.
  const token = project.local.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.type).toBe(Lang.Entries.Types.Token);
  expect(token.origin).toBe(Lang.Entries.Origins.User);
  expect(token.alias).toBeFalsy();
  expect(token.exported).toBeFalsy();
  expect(token.imported).toBeFalsy();
  expect(token.dynamic).toBeFalsy();
  expect(token.identity).toBe(1010);
  expect(token.references).toBe(0);
  expect(token.dependencies).toHaveLength(1);
  expect(token.primary).toBeUndefined();

  // Check the resulting dependency.
  const [alias] = token.dependencies;
  expect(alias).toBeDefined();
  expect(alias.type).toBe(Lang.Entries.Types.Token);
  expect(alias.origin).toBe(Lang.Entries.Origins.User);
  expect(alias.alias).toBeTruthy();
  expect(alias.exported).toBeFalsy();
  expect(alias.imported).toBeFalsy();
  expect(alias.dynamic).toBeFalsy();
  expect(alias.identifier).toBe('ALIAS');
  expect(alias.identity).toBe(0);
  expect(alias.references).toBe(1);
  expect(alias.dependencies).toHaveLength(0);
  expect(alias.primary).toBeUndefined();
});

test('Token with an identity', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token<1010> TOKEN as '@';");

  // Check the resulting token.
  const token = project.local.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.type).toBe(Lang.Entries.Types.Token);
  expect(token.origin).toBe(Lang.Entries.Origins.User);
  expect(token.alias).toBeFalsy();
  expect(token.exported).toBeFalsy();
  expect(token.imported).toBeFalsy();
  expect(token.dynamic).toBeFalsy();
  expect(token.identity).toBe(1010);
  expect(token.references).toBe(0);
  expect(token.dependencies).toHaveLength(0);
  expect(token.primary).toBeUndefined();
});

test('Token with an exported pattern', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "export alias token TOKEN as '@';");

  // Check the resulting token.
  const token = project.local.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.type).toBe(Lang.Entries.Types.Token);
  expect(token.origin).toBe(Lang.Entries.Origins.User);
  expect(token.alias).toBeTruthy();
  expect(token.exported).toBeTruthy();
  expect(token.imported).toBeFalsy();
  expect(token.dynamic).toBeFalsy();
  expect(token.identity).toBe(0);
  expect(token.references).toBe(0);
  expect(token.dependencies).toHaveLength(0);
  expect(token.primary).toBeUndefined();
});

test('Token with an imported pattern', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "import './module1'; token <3030> TOKEN as EXTERNAL_TOKEN1;");

  // Check the resulting token.
  const token = project.local.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.type).toBe(Lang.Entries.Types.Token);
  expect(token.origin).toBe(Lang.Entries.Origins.User);
  expect(token.alias).toBeFalsy();
  expect(token.exported).toBeFalsy();
  expect(token.imported).toBeFalsy();
  expect(token.dynamic).toBeFalsy();
  expect(token.identity).toBe(3030);
  expect(token.references).toBe(0);
  expect(token.dependencies).toHaveLength(1);
  expect(token.primary).toBeUndefined();

  // Check the imported dependency.
  const [imported] = token.dependencies;
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

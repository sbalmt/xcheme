import * as Lang from '../../src/index';
import * as Helper from './helper';

test('Token referring an undefined identifier', () => {
  const input = 'token TOKEN as ALIAS;';
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Token referring a node (reference error)', () => {
  const input = "node NODE as '@'; token TOKEN as NODE;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_NODE_REFERENCE]);
});

test('Token referring an alias node (reference error)', () => {
  const input = "alias node NODE as '@'; token TOKEN as NODE;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]);
});

test('Token referring a token map entry (reference error)', () => {
  const input = "token TOKEN1 as map { <100> A as 'a' }; token TOKEN2 as TOKEN1.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Token referring an alias token map entry (reference error)', () => {
  const input = "alias token TOKEN1 as map { <100> A as 'a' }; token TOKEN2 as TOKEN1.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Token referring a node map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE as map { <100> A as 'a' }; token TOKEN as NODE.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Token referring an alias node map entry (reference error)', () => {
  const input = "alias node NODE as map { <100> A as 'a' }; token TOKEN as NODE.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Loose token already defined (token collision)', () => {
  const input = "node NODE as '@'; token TOKEN as '@';";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.TOKEN_COLLISION]);
});

test('Loose token range already defined (token collision)', () => {
  const input = "node NODE as from '0' to '9'; token TOKEN as from '0' to '9';";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.TOKEN_COLLISION]);
});

test('Loose token map entry already defined (token collision)', () => {
  const input = "node NODE as map { '@' }; token TOKEN as '@';";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.TOKEN_COLLISION]);
});

test('Token already defined (token collision)', () => {
  const input = "token TOKEN1 as '@'; token TOKEN2 as '@';";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.TOKEN_COLLISION]);
});

test('Token range already defined (token collision)', () => {
  const input = "token TOKEN1 as from '0' to '9'; token TOKEN2 as from '0' to '9';";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.TOKEN_COLLISION]);
});

test('Token map entry already defined (token collision)', () => {
  const input = "token TOKEN1 as '@'; token TOKEN2 as map { '@' };";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.TOKEN_COLLISION]);
});

test('Token with a dependency (alias token reference)', () => {
  const input = "alias token ALIAS as '@'; token TOKEN as ALIAS;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.dynamic).toBeFalsy();
  expect(token.data.identity).toBe(1);
  expect(token.data.dependencies).toHaveLength(1);
  expect(token.data.dependents).toHaveLength(0);

  // Check the resulting dependency.
  const [alias] = token.data.dependencies;
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

test('Token with a zero-value identity', () => {
  const input = "token<0> TOKEN as '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.dynamic).toBeFalsy();
  expect(token.data.identity).toBe(0);
  expect(token.data.dependencies).toHaveLength(0);
  expect(token.data.dependents).toHaveLength(0);
});

test('Token with an identity', () => {
  const input = "token<1010> TOKEN as '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.dynamic).toBeFalsy();
  expect(token.data.identity).toBe(1010);
  expect(token.data.dependencies).toHaveLength(0);
  expect(token.data.dependents).toHaveLength(0);
});

test('Token with an exported pattern', () => {
  const input = "export alias token <1010> TOKEN as '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeTruthy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.dynamic).toBeFalsy();
  expect(token.data.identity).toBe(1010);
  expect(token.data.dependencies).toHaveLength(0);
  expect(token.data.dependents).toHaveLength(0);
});

test('Token with an imported pattern', () => {
  const input = "import './module1'; token <3030> TOKEN as EXTERNAL_TOKEN1;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.dynamic).toBeFalsy();
  expect(token.data.identity).toBe(3030);
  expect(token.data.dependencies).toHaveLength(1);
  expect(token.data.dependents).toHaveLength(0);

  // Check the imported dependency.
  const [imported] = token.data.dependencies;
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

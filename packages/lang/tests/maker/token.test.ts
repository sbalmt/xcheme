import * as Lang from '../../src/index';
import * as Assert from './assert';

test('Token with a duplicate identifier', () => {
  Assert.error(
    [Lang.Errors.DUPLICATE_IDENTIFIER],
    `
    token TOKEN as 'a';
    token TOKEN as 'b';`
  );
});

test('Token referring an undefined identifier', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTIFIER],
    `
    token TOKEN as ALIAS;`
  );
});

test('Token referring a node (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_NODE_REFERENCE],
    `
    node NODE as '@';
    token TOKEN as NODE;`
  );
});

test('Token referring an alias node (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE],
    `
    alias node NODE as '@';
    token TOKEN as NODE;`
  );
});

test('Loose token already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    node NODE as '@';
    token TOKEN as '@';`
  );
});

test('Loose token range already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    node NODE as from '0' to '9';
    token TOKEN as from '0' to '9';`
  );
});

test('Token already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token TOKEN1 as '@';
    token TOKEN2 as '@';`
  );
});

test('Token range already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token TOKEN1 as from '0' to '9';
    token TOKEN2 as from '0' to '9';`
  );
});

test('Token with a dependency (alias token reference)', () => {
  const project = Assert.parser(
    `
    alias token ALIAS as '@';
    token TOKEN as ALIAS;`
  );

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
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
  expect(alias.data.identifier).toBe('ALIAS');
  expect(alias.data.identity).toBe(0);
  expect(alias.data.dependencies).toHaveLength(0);
  expect(alias.data.dependents).toHaveLength(1);
});

test('Token with a zero-value identity', () => {
  const project = Assert.parser(
    `
    token<0> TOKEN as '@';`
  );

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.identity).toBe(0);
  expect(token.data.dependencies).toHaveLength(0);
  expect(token.data.dependents).toHaveLength(0);
});

test('Token with an identity', () => {
  const project = Assert.parser(
    `
    token<1010> TOKEN as '@';`
  );

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.identity).toBe(1010);
  expect(token.data.dependencies).toHaveLength(0);
  expect(token.data.dependents).toHaveLength(0);
});

test('Token with an exported pattern', () => {
  const project = Assert.parser(
    `
    export alias token <1010> TOKEN as '@';`
  );

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeTruthy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.identity).toBe(1010);
  expect(token.data.dependencies).toHaveLength(0);
  expect(token.data.dependents).toHaveLength(0);
});

test('Token with an imported pattern', () => {
  const project = Assert.parser(
    `
    import './module1';
    token <3030> TOKEN as EXTERNAL_TOKEN1;`
  );

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
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
  expect(imported.data.identifier).toBe('EXTERNAL_TOKEN1');
  expect(imported.data.identity).toBe(1010);
  expect(imported.data.dependencies).toHaveLength(1);
  expect(imported.data.dependents).toHaveLength(1);
});

import * as Lang from '../../src/index';
import * as Assert from './assert';

test('Skip referring an undefined identifier', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTIFIER],
    `
    skip TOKEN;`
  );
});

test('Skip referring a token (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_TOKEN_REFERENCE],
    `
    token <100> TOKEN as '@';
    skip TOKEN;`
  );
});

test('Skip referring a node (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_NODE_REFERENCE],
    `
    node <200> NODE as '@';
    skip NODE;`
  );
});

test('Skip referring an alias node (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE],
    `
    alias node NODE as '@';
    skip NODE;`
  );
});

test('Skip with a dependency (alias token reference)', () => {
  const project = Assert.parser(
    `
    skip ALIAS;
    alias token ALIAS as '@';`
  );

  // Check the resulting skip.
  const skip = project.symbols.get('@SKIP0')!;
  expect(skip).toBeDefined();
  expect(skip.value).toBe(Lang.Parser.Symbols.Skip);
  expect(skip.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(skip.data.exported).toBeFalsy();
  expect(skip.data.imported).toBeFalsy();
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
  expect(alias.data.identifier).toBe('ALIAS');
  expect(alias.data.identity).toBeNaN();
  expect(alias.data.dependencies).toHaveLength(0);
  expect(alias.data.dependents).toHaveLength(1);
});

test('Skip with an imported pattern', () => {
  const project = Assert.parser(
    `
    import './module1';
    skip EXTERNAL_TOKEN1;`
  );

  // Check the resulting skip.
  const skip = project.symbols.get('@SKIP0')!;
  expect(skip).toBeDefined();
  expect(skip.value).toBe(Lang.Parser.Symbols.Skip);
  expect(skip.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(skip.data.exported).toBeFalsy();
  expect(skip.data.imported).toBeFalsy();
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
  expect(imported.data.identifier).toBe('EXTERNAL_TOKEN1');
  expect(imported.data.identity).toBeNaN();
  expect(imported.data.dependencies).toHaveLength(1);
  expect(imported.data.dependents).toHaveLength(1);
});

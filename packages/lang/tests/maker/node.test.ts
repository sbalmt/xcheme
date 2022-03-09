import * as Lang from '../../src/index';
import * as Assert from './assert';

test('Node with a duplicate identifier', () => {
  Assert.error(
    [Lang.Errors.DUPLICATE_IDENTIFIER],
    `
    node NODE as 'a';
    node NODE as 'b';`
  );
});

test('Node referring an undefined identifier', () => {
  Assert.error(
    [Lang.Errors.UNDEFINED_IDENTIFIER],
    `
    node NODE as TOKEN;`
  );
});

test('Node referring an alias token (reference error)', () => {
  Assert.error(
    [Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE],
    `
    alias token TOKEN as '@';
    node NODE as TOKEN;`
  );
});

test('Node referring a loose token already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token TOKEN as '@';
    node NODE as '@';`
  );
});

test('Node referring a loose token range already defined (token collision)', () => {
  Assert.error(
    [Lang.Errors.TOKEN_COLLISION],
    `
    token TOKEN as from 'a' to 'z';
    node NODE as from 'a' to 'z';`
  );
});

test('Node with a dependency (loose token reference)', () => {
  const project = Assert.parser(`
    node NODE as '@';`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(0);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);

  // Check the resulting loose reference.
  const [loose] = node.data.dependencies;
  expect(loose).toBeDefined();
  expect(loose.value).toBe(Lang.Parser.Symbols.Token);
  expect(loose.data.origin).toBe(Lang.Symbols.Origins.Loose);
  expect(loose.data.exported).toBeFalsy();
  expect(loose.data.imported).toBeFalsy();
  expect(loose.data.identifier).toBe('@REF1');
  expect(loose.data.identity).toBe(1);
  expect(loose.data.dependencies).toHaveLength(0);
  expect(loose.data.dependents).toHaveLength(1);
});

test('Node with a zero-value identity', () => {
  const project = Assert.parser(`
    node <0> NODE as '@';`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(0);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);
});

test('Node with an identity', () => {
  const project = Assert.parser(`
    node <2020> NODE as '@';`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(2020);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);
});

test('Node with an exported pattern', () => {
  const project = Assert.parser(`
    export alias node <2020> NODE as '@';`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.AliasNode);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeTruthy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(2020);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);
});

test('Node with an imported pattern', () => {
  const project = Assert.parser(`
    import './module1';
    node <4040> NODE as EXTERNAL_NODE1;`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(4040);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);

  // Check the imported dependency.
  const [imported] = node.data.dependencies;
  expect(imported).toBeDefined();
  expect(imported.value).toBe(Lang.Parser.Symbols.AliasNode);
  expect(imported.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(imported.data.exported).toBeFalsy();
  expect(imported.data.imported).toBeTruthy();
  expect(imported.data.identifier).toBe('EXTERNAL_NODE1');
  expect(imported.data.identity).toBe(2020);
  expect(imported.data.dependencies).toHaveLength(1);
  expect(imported.data.dependents).toHaveLength(1);
});

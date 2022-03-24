import * as Lang from '../../src/index';
import * as Assert from './assert';

test('Skip with an alias token dependency', () => {
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
  expect(skip.data.identity).toBeNaN();
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

test('Skip with an imported dependency', () => {
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
  expect(skip.data.identity).toBeNaN();
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

test('Token with an alias token dependency', () => {
  const project = Assert.parser(
    `
    alias token ALIAS as '@';
    token <100> TOKEN as ALIAS;`
  );

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.identity).toBe(100);
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
  expect(alias.data.identity).toBeNaN();
  expect(alias.data.dependencies).toHaveLength(0);
  expect(alias.data.dependents).toHaveLength(1);
});

test('Token with an exported dependency', () => {
  const project = Assert.parser(
    `
    export alias token <100> TOKEN as '@';`
  );

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeTruthy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.identity).toBe(100);
  expect(token.data.dependencies).toHaveLength(0);
  expect(token.data.dependents).toHaveLength(0);
});

test('Token with an imported dependency', () => {
  const project = Assert.parser(
    `
    import './module1';
    token <150> TOKEN as EXTERNAL_TOKEN1;`
  );

  // Check the resulting token.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.identity).toBe(150);
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
  expect(imported.data.identity).toBeNaN();
  expect(imported.data.dependencies).toHaveLength(1);
  expect(imported.data.dependents).toHaveLength(1);
});

test('Node with a loose token dependency', () => {
  const project = Assert.parser(`
    node <200> NODE as '@';`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(200);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);

  // Check the resulting loose reference.
  const [loose] = node.data.dependencies;
  expect(loose).toBeDefined();
  expect(loose.value).toBe(Lang.Parser.Symbols.Token);
  expect(loose.data.origin).toBe(Lang.Symbols.Origins.Loose);
  expect(loose.data.exported).toBeFalsy();
  expect(loose.data.imported).toBeFalsy();
  expect(loose.data.identifier).toBe('@REF0');
  expect(loose.data.identity).toBe(0);
  expect(loose.data.dependencies).toHaveLength(0);
  expect(loose.data.dependents).toHaveLength(1);
});

test('Node with an exported dependency', () => {
  const project = Assert.parser(`
    export alias node <200> NODE as '@';`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.AliasNode);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeTruthy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(200);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);
});

test('Node with an imported dependency', () => {
  const project = Assert.parser(`
    import './module1';
    node <250> NODE as EXTERNAL_NODE1;`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(250);
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
  expect(imported.data.identity).toBeNaN();
  expect(imported.data.dependencies).toHaveLength(1);
  expect(imported.data.dependents).toHaveLength(1);
});

test('Directive importation purge', () => {
  const project = Assert.parser(`
    import './module4';`);

  // Check the first token directive.
  const token1 = project.symbols.get('EXPORTED_TOKEN1')!;
  expect(token1).toBeDefined();
  expect(token1.value).toBe(Lang.Parser.Symbols.Token);
  expect(token1.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(token1.data.exported).toBeFalsy();
  expect(token1.data.imported).toBeTruthy();
  expect(token1.data.identity).toBe(1);
  expect(token1.data.dependencies).toHaveLength(1);
  expect(token1.data.dependents).toHaveLength(0);

  // Check the dependency.
  const [dependency] = token1.data.dependencies;
  expect(dependency).toBeDefined();
  expect(dependency.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(dependency.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(dependency.data.exported).toBeFalsy();
  expect(dependency.data.imported).toBeFalsy();
  expect(dependency.data.identifier).toBe('ALIAS_TOKEN1');
  expect(dependency.data.identity).toBeNaN();
  expect(dependency.data.dependencies).toHaveLength(0);
  expect(dependency.data.dependents).toHaveLength(2);

  // Check the dependency dependents.
  const [dependent1, dependent2] = dependency.data.dependents;

  expect(dependent1).toBeDefined();
  expect(dependent1.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(dependent1.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(dependent1.data.exported).toBeFalsy();
  expect(dependent1.data.imported).toBeFalsy();
  expect(dependent1.data.identifier).toBe('ALIAS_TOKEN2');
  expect(dependent1.data.identity).toBeNaN();
  expect(dependent1.data.dependencies).toHaveLength(1);
  expect(dependent1.data.dependents).toHaveLength(1);

  expect(dependent2).toBeDefined();
  expect(dependent2.data.identifier).toBe('EXPORTED_TOKEN1');
});

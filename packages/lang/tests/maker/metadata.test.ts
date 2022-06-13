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
  expect(skip.data.origin).toBe(Lang.Types.Origins.User);
  expect(skip.data.exported).toBeFalsy();
  expect(skip.data.imported).toBeFalsy();
  expect(skip.data.identity).toBeNaN();
  expect(skip.data.dependencies).toHaveLength(1);
  expect(skip.data.dependents).toHaveLength(0);

  // Check the resulting dependency.
  const [dependency] = skip.data.dependencies;
  expect(dependency).toBeDefined();
  expect(dependency.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(dependency.data.origin).toBe(Lang.Types.Origins.User);
  expect(dependency.data.exported).toBeFalsy();
  expect(dependency.data.imported).toBeFalsy();
  expect(dependency.data.identifier).toBe('ALIAS');
  expect(dependency.data.identity).toBeNaN();
  expect(dependency.data.dependencies).toHaveLength(0);
  expect(dependency.data.dependents).toHaveLength(1);
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
  expect(skip.data.origin).toBe(Lang.Types.Origins.User);
  expect(skip.data.exported).toBeFalsy();
  expect(skip.data.imported).toBeFalsy();
  expect(skip.data.identity).toBeNaN();
  expect(skip.data.dependencies).toHaveLength(1);
  expect(skip.data.dependents).toHaveLength(0);

  // Check the imported dependency.
  const [dependency] = skip.data.dependencies;
  expect(dependency).toBeDefined();
  expect(dependency.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(dependency.data.origin).toBe(Lang.Types.Origins.User);
  expect(dependency.data.exported).toBeFalsy();
  expect(dependency.data.imported).toBeTruthy();
  expect(dependency.data.identifier).toBe('EXTERNAL_TOKEN1');
  expect(dependency.data.identity).toBeNaN();
  expect(dependency.data.dependencies).toHaveLength(1);
  expect(dependency.data.dependents).toHaveLength(1);
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
  expect(token.data.origin).toBe(Lang.Types.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.identity).toBe(100);
  expect(token.data.dependencies).toHaveLength(1);
  expect(token.data.dependents).toHaveLength(0);

  // Check the resulting dependency.
  const [dependency] = token.data.dependencies;
  expect(dependency).toBeDefined();
  expect(dependency.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(dependency.data.origin).toBe(Lang.Types.Origins.User);
  expect(dependency.data.exported).toBeFalsy();
  expect(dependency.data.imported).toBeFalsy();
  expect(dependency.data.identifier).toBe('ALIAS');
  expect(dependency.data.identity).toBeNaN();
  expect(dependency.data.dependencies).toHaveLength(0);
  expect(dependency.data.dependents).toHaveLength(1);
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
  expect(token.data.origin).toBe(Lang.Types.Origins.User);
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
  expect(token.data.origin).toBe(Lang.Types.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeFalsy();
  expect(token.data.identity).toBe(150);
  expect(token.data.dependencies).toHaveLength(1);
  expect(token.data.dependents).toHaveLength(0);

  // Check the imported dependency.
  const [dependency] = token.data.dependencies;
  expect(dependency).toBeDefined();
  expect(dependency.value).toBe(Lang.Parser.Symbols.AliasToken);
  expect(dependency.data.origin).toBe(Lang.Types.Origins.User);
  expect(dependency.data.exported).toBeFalsy();
  expect(dependency.data.imported).toBeTruthy();
  expect(dependency.data.identifier).toBe('EXTERNAL_TOKEN1');
  expect(dependency.data.identity).toBeNaN();
  expect(dependency.data.dependencies).toHaveLength(1);
  expect(dependency.data.dependents).toHaveLength(1);
});

test('Node with a loose token dependency', () => {
  const project = Assert.parser(`
    node <200> NODE as '@';`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Types.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(200);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);

  // Check the resulting loose reference.
  const [dependency] = node.data.dependencies;
  expect(dependency).toBeDefined();
  expect(dependency.value).toBe(Lang.Parser.Symbols.Token);
  expect(dependency.data.origin).toBe(Lang.Types.Origins.Loose);
  expect(dependency.data.exported).toBeFalsy();
  expect(dependency.data.imported).toBeFalsy();
  expect(dependency.data.identifier).toBe('@REF0');
  expect(dependency.data.identity).toBe(0);
  expect(dependency.data.dependencies).toHaveLength(0);
  expect(dependency.data.dependents).toHaveLength(1);
});

test('Node with an exported dependency', () => {
  const project = Assert.parser(`
    export alias node <200> NODE as '@';`);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.AliasNode);
  expect(node.data.origin).toBe(Lang.Types.Origins.User);
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
  expect(node.data.origin).toBe(Lang.Types.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.identity).toBe(250);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);

  // Check the imported dependency.
  const [dependency] = node.data.dependencies;
  expect(dependency).toBeDefined();
  expect(dependency.value).toBe(Lang.Parser.Symbols.AliasNode);
  expect(dependency.data.origin).toBe(Lang.Types.Origins.User);
  expect(dependency.data.exported).toBeFalsy();
  expect(dependency.data.imported).toBeTruthy();
  expect(dependency.data.identifier).toBe('EXTERNAL_NODE1');
  expect(dependency.data.identity).toBeNaN();
  expect(dependency.data.dependencies).toHaveLength(1);
  expect(dependency.data.dependents).toHaveLength(1);
});

test('Directive importation purge', () => {
  const project = Assert.parser(`
    import './module4';`);

  // Check the token directive.
  const token = project.symbols.get('EXPORTED_TOKEN')!;
  expect(token).toBeDefined();
  expect(token.value).toBe(Lang.Parser.Symbols.Token);
  expect(token.data.origin).toBe(Lang.Types.Origins.User);
  expect(token.data.exported).toBeFalsy();
  expect(token.data.imported).toBeTruthy();
  expect(token.data.identity).toBe(0);
  expect(token.data.dependencies).toHaveLength(0);
  expect(token.data.dependents).toHaveLength(0);
});

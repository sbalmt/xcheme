import * as Lang from '../../src/index';
import * as Helper from './helper';

test('Node referring an undefined identifier', () => {
  const input = 'node NODE as TOKEN;';
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Node referring an alias token (reference error)', () => {
  const input = "alias token TOKEN as '@'; node NODE as TOKEN;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE]);
});

test('Node referring an undefined token map entry (reference error)', () => {
  const input = "token TOKEN as map { 'a' }; node NODE as TOKEN.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Node referring a node map entry (reference error)', () => {
  const input = "node NODE1 as map { A as 'a' }; node NODE2 as NODE1.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Node referring an alias node map entry (reference error)', () => {
  const input = "alias node NODE1 as map { A as 'a' }; node NODE2 as NODE1.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Node referring a whole token map (reference error)', () => {
  const input = "token TOKEN as map { A as 'a' }; node NODE as TOKEN;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_REFERENCE]);
});

test('Node referring a whole nested token map entry (reference error)', () => {
  const input = "token TOKEN as map { A as 'a' & map { B as 'b' } }; node NODE as TOKEN.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_REFERENCE]);
});

test('Node referring an alias token map entry (reference error)', () => {
  const input = "alias token TOKEN as map { A as 'a' }; node NODE as TOKEN.A;";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]);
});

test('Node referring a loose token already defined (token collision)', () => {
  const input = "token TOKEN as '@'; node NODE as '@';";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.TOKEN_COLLISION]);
});

test('Node referring a loose token range already defined (token collision)', () => {
  const input = "token TOKEN as from 'a' to 'z'; node NODE as from 'a' to 'z';";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.TOKEN_COLLISION]);
});

test('Node referring a loose token map already defined (token collision)', () => {
  const input = "token TOKEN as 'a'; node NODE as map { 'a' };";
  Helper.makeError(new Lang.LiveCoder(), input, [Lang.Errors.TOKEN_COLLISION]);
});

test('Node with a dependency (loose token reference)', () => {
  const input = "node NODE as '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.dynamic).toBeFalsy();
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
  expect(loose.data.dynamic).toBeFalsy();
  expect(loose.data.identifier).toBe('@REF1');
  expect(loose.data.identity).toBe(1);
  expect(loose.data.dependencies).toHaveLength(0);
  expect(loose.data.dependents).toHaveLength(1);
});

test('Node with a zero-value identity', () => {
  const input = "node <0> NODE as '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.dynamic).toBeFalsy();
  expect(node.data.identity).toBe(0);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);
});

test('Node with an identity', () => {
  const input = "node <2020> NODE as '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.dynamic).toBeFalsy();
  expect(node.data.identity).toBe(2020);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);
});

test('Node with an exported pattern', () => {
  const input = "export alias node <2020> NODE as '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.AliasNode);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeTruthy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.dynamic).toBeFalsy();
  expect(node.data.identity).toBe(2020);
  expect(node.data.dependencies).toHaveLength(1);
  expect(node.data.dependents).toHaveLength(0);
});

test('Node with an imported pattern', () => {
  const input = "import './module1'; node <4040> NODE as EXTERNAL_NODE1;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the resulting node.
  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.value).toBe(Lang.Parser.Symbols.Node);
  expect(node.data.origin).toBe(Lang.Symbols.Origins.User);
  expect(node.data.exported).toBeFalsy();
  expect(node.data.imported).toBeFalsy();
  expect(node.data.dynamic).toBeFalsy();
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
  expect(imported.data.dynamic).toBeFalsy();
  expect(imported.data.identifier).toBe('EXTERNAL_NODE1');
  expect(imported.data.identity).toBe(2020);
  expect(imported.data.dependencies).toHaveLength(1);
  expect(imported.data.dependents).toHaveLength(1);
});

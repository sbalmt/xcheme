import * as Helper from './helper';
import * as Lang from '../../src/index';

test('Node referring an undefined identifier', () => {
  Helper.makeError(new Lang.LiveCoder(), 'node NODE as TOKEN;', [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Node referring an alias token (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias token TOKEN as '@'; node NODE as TOKEN;", [Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE]);
});

test('Node referring an undefined token map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN as map { 'a' }; node NODE as TOKEN.A;", [Lang.Errors.UNDEFINED_IDENTIFIER]);
});

test('Node referring a node map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "node NODE1 as map { A as 'a' }; node NODE2 as NODE1.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Node referring an alias node map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias node NODE1 as map { A as 'a' }; node NODE2 as NODE1.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Node referring a whole token map (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN as map { A as 'a' }; node NODE as TOKEN;", [Lang.Errors.INVALID_MAP_REFERENCE]);
});

test('Node referring a whole nested token map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN as map { A as 'a' & map { B as 'b' } }; node NODE as TOKEN.A;", [
    Lang.Errors.INVALID_MAP_REFERENCE
  ]);
});

test('Node referring an alias token map entry (reference error)', () => {
  Helper.makeError(new Lang.LiveCoder(), "alias token TOKEN as map { A as 'a' }; node NODE as TOKEN.A;", [
    Lang.Errors.INVALID_MAP_ENTRY_REFERENCE
  ]);
});

test('Node referring a loose token already defined (token collision)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN as '@'; node NODE as '@';", [Lang.Errors.TOKEN_COLLISION]);
});

test('Node referring a loose token range already defined (token collision)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN as from 'a' to 'z'; node NODE as from 'a' to 'z';", [
    Lang.Errors.TOKEN_COLLISION
  ]);
});

test('Node referring a loose token map already defined (token collision)', () => {
  Helper.makeError(new Lang.LiveCoder(), "token TOKEN as 'a'; node NODE as map { 'a' };", [Lang.Errors.TOKEN_COLLISION]);
});

test('Node with a dependency (loose token reference)', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as '@';");

  // Check the resulting node.
  const node = project.local.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.type).toBe(Lang.Entries.Types.Node);
  expect(node.origin).toBe(Lang.Entries.Origins.User);
  expect(node.alias).toBeFalsy();
  expect(node.exported).toBeFalsy();
  expect(node.imported).toBeFalsy();
  expect(node.dynamic).toBeFalsy();
  expect(node.identity).toBe(0);
  expect(node.dependencies).toHaveLength(1);
  expect(node.dependents).toHaveLength(0);

  // Check the resulting loose reference.
  const [loose] = node.dependencies;
  expect(loose).toBeDefined();
  expect(loose.type).toBe(Lang.Entries.Types.Token);
  expect(loose.origin).toBe(Lang.Entries.Origins.Loose);
  expect(loose.alias).toBeFalsy();
  expect(loose.exported).toBeFalsy();
  expect(loose.imported).toBeFalsy();
  expect(loose.dynamic).toBeFalsy();
  expect(loose.identifier).toBe('@REF1');
  expect(loose.identity).toBe(1);
  expect(loose.dependencies).toHaveLength(0);
  expect(loose.dependents).toHaveLength(1);
});

test('Node with an identity', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node <2020> NODE as '@';");

  // Check the resulting node.
  const node = project.local.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.type).toBe(Lang.Entries.Types.Node);
  expect(node.origin).toBe(Lang.Entries.Origins.User);
  expect(node.alias).toBeFalsy();
  expect(node.exported).toBeFalsy();
  expect(node.imported).toBeFalsy();
  expect(node.dynamic).toBeFalsy();
  expect(node.identity).toBe(2020);
  expect(node.dependencies).toHaveLength(1);
  expect(node.dependents).toHaveLength(0);
});

test('Node with an exported pattern', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "export alias node <2020> NODE as '@';");

  // Check the resulting node.
  const node = project.local.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.type).toBe(Lang.Entries.Types.Node);
  expect(node.origin).toBe(Lang.Entries.Origins.User);
  expect(node.alias).toBeTruthy();
  expect(node.exported).toBeTruthy();
  expect(node.imported).toBeFalsy();
  expect(node.dynamic).toBeFalsy();
  expect(node.identity).toBe(2020);
  expect(node.dependencies).toHaveLength(1);
  expect(node.dependents).toHaveLength(0);
});

test('Node with an imported pattern', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "import './module1'; node <4040> NODE as EXTERNAL_NODE1;");

  // Check the resulting node.
  const node = project.local.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.type).toBe(Lang.Entries.Types.Node);
  expect(node.origin).toBe(Lang.Entries.Origins.User);
  expect(node.alias).toBeFalsy();
  expect(node.exported).toBeFalsy();
  expect(node.imported).toBeFalsy();
  expect(node.dynamic).toBeFalsy();
  expect(node.identity).toBe(4040);
  expect(node.dependencies).toHaveLength(1);
  expect(node.dependents).toHaveLength(0);

  // Check the imported dependency.
  const [imported] = node.dependencies;
  expect(imported).toBeDefined();
  expect(imported.type).toBe(Lang.Entries.Types.Node);
  expect(imported.origin).toBe(Lang.Entries.Origins.User);
  expect(imported.alias).toBeTruthy();
  expect(imported.exported).toBeFalsy();
  expect(imported.imported).toBeTruthy();
  expect(imported.dynamic).toBeFalsy();
  expect(imported.identifier).toBe('EXTERNAL_NODE1');
  expect(imported.identity).toBe(2020);
  expect(imported.dependencies).toHaveLength(1);
  expect(imported.dependents).toHaveLength(1);
});

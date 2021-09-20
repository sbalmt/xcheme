import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'NODE' rule with a loose token reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as '@' & '@' & opt '@';");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(
    `new Core.EmitNodePattern(${node.identity}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.identity}, ${token.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.ExpectUnitPattern(${token.identity}))` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' rule with a loose token range rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as from '0' to '9';");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!;
  expect(token).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, new Core.ExpectUnitPattern(${token.identity}))`);
});

test("Output a 'NODE' rule with a loose token map reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as map { 'a', 'b' };");

  // Check the output code.
  const token1 = project.tokenEntries.get('@REF1')!; // 'a'
  expect(token1).toBeDefined();

  const token2 = project.tokenEntries.get('@REF2')!; // 'b'
  expect(token2).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${0}, ${token1.identity}), ` +
      /******/ `new Core.SetValueRoute(${0}, ${token2.identity})` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' rule with a token reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token TOKEN as '@'; node NODE as TOKEN;");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, new Core.ExpectUnitPattern(${token.identity}))`);
});

test("Output a 'NODE' rule with an alias node reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias node ALIAS as '@'; node NODE as ALIAS;");

  // Check the output code.
  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();

  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, ALIAS)`);
});

test("Output a 'NODE' rule with a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as '@' & opt NODE;");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();

  const pointer = project.nodePointerEntries.get('NODE')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.EmitNodePattern(${pointer.identity}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => NODE))` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.RunFlowPattern(() => NODE)`);
});

test("Output a 'NODE' rule with an alias node that has a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias node ALIAS as '@' & opt ALIAS; node NODE as ALIAS;");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();

  const pointer = project.nodePointerEntries.get('ALIAS')!;
  expect(pointer).toBeDefined();
  expect(pointer.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern(${token.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => ALIAS)` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, ALIAS)`);
});

test("Output a 'NODE' rule with token map entry references", () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    "token TOKEN as map { <100> A as 'a', <101> B as 'b' }; node NODE as map { <200> A as TOKEN.A, <201> B as TOKEN.B };"
  );

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${100}, 'a'), ` +
      /******/ `new Core.SetValueRoute(${101}, 'b')` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${200}, ${100}), ` +
      /******/ `new Core.SetValueRoute(${201}, ${101})` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' rule with a whole node map reference", () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    "alias node NODE1 as map { <200> A as 'a', <201> B as 'b' }; node NODE2 as NODE1 & '!';"
  );

  // Check the output code.
  const token1 = project.tokenEntries.get('@REF1')!; // 'a'
  const token2 = project.tokenEntries.get('@REF2')!; // 'b'
  const token3 = project.tokenEntries.get('@REF4')!; // '!'

  expect(token1).toBeDefined();
  expect(token2).toBeDefined();
  expect(token3).toBeDefined();

  const node1 = project.nodeEntries.get('NODE1')!;
  expect(node1).toBeDefined();
  expect(node1.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.SetValueRoute(${200}, ${token1.identity}), ` +
      /**/ `new Core.SetValueRoute(${201}, ${token2.identity})` +
      `)`
  );

  const node2 = project.nodeEntries.get('NODE2')!;
  expect(node2).toBeDefined();
  expect(node2.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(NODE1, ` +
      /******/ `new Core.ExpectUnitPattern(${token3.identity})` +
      /**/ `)` +
      `)`
  );
});

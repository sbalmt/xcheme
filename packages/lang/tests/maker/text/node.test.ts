import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output a 'NODE' pattern with a loose token reference", () => {
  const input = "node NODE as '@' & '@' & opt '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token = project.symbols.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(1);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(0);
  expect(node.data.pattern).toBe(
    `new Core.EmitNodePattern(${node.data.identity}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.data.identity}, ${token.data.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.ExpectUnitPattern(${token.data.identity}))` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' pattern with a loose token range reference", () => {
  const input = "node NODE as from '0' to '9';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token = project.symbols.get('@REF1')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(1);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(0);
  expect(node.data.pattern).toBe(
    `new Core.EmitNodePattern(${node.data.identity}, 1, new Core.ExpectUnitPattern(${token.data.identity}))`
  );
});

test("Output a 'NODE' pattern with a loose token map reference", () => {
  const input = "node <auto> NODE as map { 'a', 'b' };";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token1 = project.symbols.get('@REF0')!; // 'a'
  expect(token1).toBeDefined();
  expect(token1.data.identity).toBe(0);

  const token2 = project.symbols.get('@REF1')!; // 'b'
  expect(token2).toBeDefined();
  expect(token2.data.identity).toBe(1);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(Core.BaseSource.Output);
  expect(node.data.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${node.data.identity}, ${token1.data.identity}), ` +
      /******/ `new Core.SetValueRoute(${node.data.identity}, ${token2.data.identity})` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' pattern with a token reference", () => {
  const input = "token TOKEN as '@'; node NODE as TOKEN;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(0);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(1);
  expect(node.data.pattern).toBe(
    `new Core.EmitNodePattern(${node.data.identity}, 1, new Core.ExpectUnitPattern(${token.data.identity}))`
  );
});

test("Output a 'NODE' pattern with an alias node reference", () => {
  const input = "alias node ALIAS as '@'; node NODE as ALIAS;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const alias = project.symbols.get('ALIAS')!;
  expect(alias).toBeDefined();
  expect(alias.data.identity).toBe(0);
  expect(alias.data.pattern).toBe(`new Core.ExpectUnitPattern(1)`);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(2);
  expect(node.data.pattern).toBe(`new Core.EmitNodePattern(${node.data.identity}, 1, new Core.ExpectUnitPattern(1))`);
});

test("Output a 'NODE' pattern with a reference to itself", () => {
  const input = "node NODE as '@' & opt NODE;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token = project.symbols.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(1);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(0);
  expect(node.data.pattern).toBe(
    `new Core.EmitNodePattern(${node.data.identity}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.data.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_NODE))` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' pattern with an alias node that has a reference to itself", () => {
  const input = "alias node ALIAS as '@' & opt ALIAS; node NODE as ALIAS;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token = project.symbols.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(1);

  const alias = project.symbols.get('ALIAS')!;
  expect(alias).toBeDefined();
  expect(alias.data.identity).toBe(0);
  expect(alias.data.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern(${token.data.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_ALIAS)` +
      /**/ `)` +
      `)`
  );

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(2);
  expect(node.data.pattern).toBe(`new Core.EmitNodePattern(${node.data.identity}, 1, L0_ALIAS)`);
});

test("Output a 'NODE' pattern with token map entry references", () => {
  const input =
    "token <auto> TOKEN as map { <100> A as 'a', <101> B as 'b' }; node <auto> NODE as map { <200> A as TOKEN.A, <201> B as TOKEN.B };";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const tokenRouteA = project.symbols.get('TOKEN@A')!;
  expect(tokenRouteA).toBeDefined();
  expect(tokenRouteA.data.identity).toBe(100);

  const tokenRouteB = project.symbols.get('TOKEN@B')!;
  expect(tokenRouteB).toBeDefined();
  expect(tokenRouteB.data.identity).toBe(101);

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(Core.BaseSource.Output);
  expect(token.data.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${tokenRouteA.data.identity}, 'a'), ` +
      /******/ `new Core.SetValueRoute(${tokenRouteB.data.identity}, 'b')` +
      /**/ `)` +
      `)`
  );

  const nodeRouteA = project.symbols.get('NODE@A')!;
  expect(nodeRouteA).toBeDefined();
  expect(nodeRouteA.data.identity).toBe(200);

  const nodeRouteB = project.symbols.get('NODE@B')!;
  expect(nodeRouteB).toBeDefined();
  expect(nodeRouteB.data.identity).toBe(201);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(Core.BaseSource.Output);
  expect(node.data.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${nodeRouteA.data.identity}, ${tokenRouteA.data.identity}), ` +
      /******/ `new Core.SetValueRoute(${nodeRouteB.data.identity}, ${tokenRouteB.data.identity})` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' pattern with a whole node map reference", () => {
  const input = "alias node NODE1 as map { <200> A as 'a', <201> B as 'b' }; node <auto> NODE2 as NODE1 & '!';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token1 = project.symbols.get('@REF1')!; // 'a'
  expect(token1.data.identity).toBe(1);
  expect(token1).toBeDefined();

  const token2 = project.symbols.get('@REF2')!; // 'b'
  expect(token2.data.identity).toBe(2);
  expect(token2).toBeDefined();

  const token3 = project.symbols.get('@REF3')!; // '!'
  expect(token3.data.identity).toBe(3);
  expect(token3).toBeDefined();

  const nodeRouteA = project.symbols.get('NODE1@A')!;
  expect(nodeRouteA).toBeDefined();
  expect(nodeRouteA.data.identity).toBe(200);

  const nodeRouteB = project.symbols.get('NODE1@B')!;
  expect(nodeRouteB).toBeDefined();
  expect(nodeRouteB.data.identity).toBe(201);

  const node1 = project.symbols.get('NODE1')!;
  expect(node1).toBeDefined();
  expect(node1.data.identity).toBe(0);
  expect(node1.data.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.SetValueRoute(${nodeRouteA.data.identity}, ${token1.data.identity}), ` +
      /**/ `new Core.SetValueRoute(${nodeRouteB.data.identity}, ${token2.data.identity})` +
      `)`
  );

  const node2 = project.symbols.get('NODE2')!;
  expect(node2).toBeDefined();
  expect(node2.data.identity).toBe(Core.BaseSource.Output);
  expect(node2.data.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.MapFlowPattern(` +
      /**********/ `new Core.SetValueRoute(${nodeRouteA.data.identity}, ${token1.data.identity}), ` +
      /**********/ `new Core.SetValueRoute(${nodeRouteB.data.identity}, ${token2.data.identity})` +
      /******/ `), ` +
      /******/ `new Core.ExpectUnitPattern(${token3.data.identity})` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' pattern with an imported alias pattern", () => {
  const input = "import './module2'; node <4040> NODE as EXTERNAL_NODE1;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const external = project.symbols.get('EXTERNAL_NODE1')!;
  expect(external).toBeDefined();
  expect(external.data.identity).toBe(2020);
  expect(external.data.pattern).toBe(`L2_ALIAS_NODE`);

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(4040);
  expect(node.data.pattern).toBe(`new Core.EmitNodePattern(${node.data.identity}, 1, L2_ALIAS_NODE)`);
});

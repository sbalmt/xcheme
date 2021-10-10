import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'NODE' rule with a loose token reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as '@' & '@' & opt '@';");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(token.identity).toBe(1);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.identity).toBe(0);
  expect(node.pattern).toBe(
    `new Core.EmitNodePattern(${node.identity}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.identity}, ${token.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.ExpectUnitPattern(${token.identity}))` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' rule with a loose token range reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as from '0' to '9';");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!;
  expect(token).toBeDefined();
  expect(token.identity).toBe(1);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.identity).toBe(0);
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, new Core.ExpectUnitPattern(${token.identity}))`);
});

test("Output a 'NODE' rule with a loose token map reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node <auto> NODE as map { 'a', 'b' };");

  // Check the output code.
  const token1 = project.tokenEntries.get('@REF0')!; // 'a'
  expect(token1).toBeDefined();
  expect(token1.identity).toBe(0);

  const token2 = project.tokenEntries.get('@REF1')!; // 'b'
  expect(token2).toBeDefined();
  expect(token2.identity).toBe(1);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.identity).toBe(Core.BaseSource.Output);
  expect(node.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${node.identity}, ${token1.identity}), ` +
      /******/ `new Core.SetValueRoute(${node.identity}, ${token2.identity})` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' rule with a token reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token TOKEN as '@'; node NODE as TOKEN;");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.identity).toBe(0);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.identity).toBe(1);
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, new Core.ExpectUnitPattern(${token.identity}))`);
});

test("Output a 'NODE' rule with an alias node reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias node ALIAS as '@'; node NODE as ALIAS;");

  // Check the output code.
  const alias = project.nodeEntries.get('ALIAS')!;
  expect(alias).toBeDefined();
  expect(alias.identity).toBe(0);
  expect(alias.pattern).toBe(`new Core.ExpectUnitPattern(1)`);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.identity).toBe(2);
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, new Core.ExpectUnitPattern(1))`);
});

test("Output a 'NODE' rule with a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "node NODE as '@' & opt NODE;");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(token.identity).toBe(1);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.identity).toBe(0);
  expect(node.pattern).toBe(
    `new Core.EmitNodePattern(${node.identity}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern(${token.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => U_NODE))` +
      /**/ `)` +
      `)`
  );

  const link = project.nodeEntries.get(`@LINK${node.identity}`)!;
  expect(link).toBeDefined();
  expect(link.identity).toBe(node.identity);
  expect(link.pattern).toBe('U_NODE');
});

test("Output a 'NODE' rule with an alias node that has a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias node ALIAS as '@' & opt ALIAS; node NODE as ALIAS;");

  // Check the output code.
  const token = project.tokenEntries.get('@REF1')!; // '@'
  expect(token).toBeDefined();
  expect(token.identity).toBe(1);

  const alias = project.nodeEntries.get('ALIAS')!;
  expect(alias).toBeDefined();
  expect(alias.identity).toBe(0);
  expect(alias.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern(${token.identity}), ` +
      /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => U_ALIAS)` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.identity).toBe(2);
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, U_ALIAS)`);
});

test("Output a 'NODE' rule with a token map entry references", () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    "token <auto> TOKEN as map { <100> A as 'a', <101> B as 'b' }; node <auto> NODE as map { <200> A as TOKEN.A, <201> B as TOKEN.B };"
  );

  // Check the output code.
  const tokenRouteA = project.tokenEntries.get('TOKEN@A')!;
  expect(tokenRouteA).toBeDefined();
  expect(tokenRouteA.identity).toBe(100);

  const tokenRouteB = project.tokenEntries.get('TOKEN@B')!;
  expect(tokenRouteB).toBeDefined();
  expect(tokenRouteB.identity).toBe(101);

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.identity).toBe(Core.BaseSource.Output);
  expect(token.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${tokenRouteA.identity}, 'a'), ` +
      /******/ `new Core.SetValueRoute(${tokenRouteB.identity}, 'b')` +
      /**/ `)` +
      `)`
  );

  const nodeRouteA = project.nodeEntries.get('NODE@A')!;
  expect(nodeRouteA).toBeDefined();
  expect(nodeRouteA.identity).toBe(200);

  const nodeRouteB = project.nodeEntries.get('NODE@B')!;
  expect(nodeRouteB).toBeDefined();
  expect(nodeRouteB.identity).toBe(201);

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.identity).toBe(Core.BaseSource.Output);
  expect(node.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${nodeRouteA.identity}, ${tokenRouteA.identity}), ` +
      /******/ `new Core.SetValueRoute(${nodeRouteB.identity}, ${tokenRouteB.identity})` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'NODE' rule with a whole node map reference", () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    "alias node NODE1 as map { <200> A as 'a', <201> B as 'b' }; node <auto> NODE2 as NODE1 & '!';"
  );

  // Check the output code.
  const token1 = project.tokenEntries.get('@REF1')!; // 'a'
  expect(token1.identity).toBe(1);
  expect(token1).toBeDefined();

  const token2 = project.tokenEntries.get('@REF2')!; // 'b'
  expect(token2.identity).toBe(2);
  expect(token2).toBeDefined();

  const token3 = project.tokenEntries.get('@REF3')!; // '!'
  expect(token3.identity).toBe(3);
  expect(token3).toBeDefined();

  const nodeRouteA = project.nodeEntries.get('NODE1@A')!;
  expect(nodeRouteA).toBeDefined();
  expect(nodeRouteA.identity).toBe(200);

  const nodeRouteB = project.nodeEntries.get('NODE1@B')!;
  expect(nodeRouteB).toBeDefined();
  expect(nodeRouteB.identity).toBe(201);

  const node1 = project.nodeEntries.get('NODE1')!;
  expect(node1).toBeDefined();
  expect(node1.identity).toBe(0);
  expect(node1.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.SetValueRoute(${nodeRouteA.identity}, ${token1.identity}), ` +
      /**/ `new Core.SetValueRoute(${nodeRouteB.identity}, ${token2.identity})` +
      `)`
  );

  const node2 = project.nodeEntries.get('NODE2')!;
  expect(node2).toBeDefined();
  expect(node2.identity).toBe(Core.BaseSource.Output);
  expect(node2.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.MapFlowPattern(` +
      /**********/ `new Core.SetValueRoute(${nodeRouteA.identity}, ${token1.identity}), ` +
      /**********/ `new Core.SetValueRoute(${nodeRouteB.identity}, ${token2.identity})` +
      /******/ `), ` +
      /******/ `new Core.ExpectUnitPattern(${token3.identity})` +
      /**/ `)` +
      `)`
  );
});

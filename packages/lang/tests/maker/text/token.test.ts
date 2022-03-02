import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output a 'TOKEN' pattern", () => {
  const input = "token TOKEN as '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(0);
  expect(token.data.pattern).toBe(`new Core.EmitTokenPattern(${token.data.identity}, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'TOKEN' pattern with an alias token reference", () => {
  const input = "alias token ALIAS as '@'; token TOKEN as ALIAS;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const alias = project.symbols.get('ALIAS')!;
  expect(alias).toBeDefined();
  expect(alias.data.identity).toBe(0);
  expect(alias.data.pattern).toBe(`new Core.ExpectUnitPattern('@')`);

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(1);
  expect(token.data.pattern).toBe(`new Core.EmitTokenPattern(${token.data.identity}, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'TOKEN' pattern with a reference to itself", () => {
  const input = "token TOKEN as '@' & opt TOKEN;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(0);
  expect(token.data.pattern).toBe(
    `new Core.EmitTokenPattern(${token.data.identity}, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('@'), ` +
      /******/ `new Core.OptFlowPattern(` +
      /**********/ `new Core.RunFlowPattern(() => L0_TOKEN)` +
      /******/ `)` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'TOKEN' pattern with an alias token that has a reference to itself", () => {
  const input = "alias token ALIAS as '@' & opt ALIAS; token TOKEN as ALIAS;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const alias = project.symbols.get('ALIAS')!;
  expect(alias).toBeDefined();
  expect(alias.data.identity).toBe(0);
  expect(alias.data.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RunFlowPattern(() => L0_ALIAS)` +
      /**/ `)` +
      `)`
  );

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(1);
  expect(token.data.pattern).toBe(`new Core.EmitTokenPattern(${token.data.identity}, L0_ALIAS)`);
});

test("Output a 'TOKEN' pattern with a whole token map reference", () => {
  const input = "alias token TOKEN1 as map { <100> A as 'a', <101> B as 'b' }; token <auto> TOKEN2 as TOKEN1 & '!';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const tokenRouteA = project.symbols.get('TOKEN1@A')!;
  expect(tokenRouteA).toBeDefined();
  expect(tokenRouteA.data.identity).toBe(100);

  const tokenRouteB = project.symbols.get('TOKEN1@B')!;
  expect(tokenRouteB).toBeDefined();
  expect(tokenRouteB.data.identity).toBe(101);

  const token1 = project.symbols.get('TOKEN1')!;
  expect(token1).toBeDefined();
  expect(token1.data.identity).toBe(0);
  expect(token1.data.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.SetValueRoute(${tokenRouteA.data.identity}, 'a'), ` +
      /**/ `new Core.SetValueRoute(${tokenRouteB.data.identity}, 'b')` +
      `)`
  );

  const token2 = project.symbols.get('TOKEN2')!;
  expect(token2).toBeDefined();
  expect(token2.data.identity).toBe(Core.BaseSource.Output);
  expect(token2.data.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.MapFlowPattern(` +
      /**********/ `new Core.SetValueRoute(${tokenRouteA.data.identity}, 'a'), ` +
      /**********/ `new Core.SetValueRoute(${tokenRouteB.data.identity}, 'b')` +
      /******/ `), ` +
      /******/ `new Core.ExpectUnitPattern('!')` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'TOKEN' pattern with an imported alias pattern", () => {
  const input = "import './module2'; token <3030> TOKEN as EXTERNAL_TOKEN1;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const external = project.symbols.get('EXTERNAL_TOKEN1')!;
  expect(external).toBeDefined();
  expect(external.data.identity).toBe(1010);
  expect(external.data.pattern).toBe(`L2_ALIAS_TOKEN`);

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(3030);
  expect(token.data.pattern).toBe(`new Core.EmitTokenPattern(${token.data.identity}, ${external.data.pattern})`);
});

import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'TOKEN' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token TOKEN as '@';");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.identity).toBe(0);
  expect(token.pattern).toBe(`new Core.EmitTokenPattern(${token.identity}, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'TOKEN' rule with an alias token reference", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias token ALIAS as '@'; token TOKEN as ALIAS;");

  // Check the output code.
  const alias = project.tokenEntries.get('ALIAS')!;
  expect(alias).toBeDefined();
  expect(alias.identity).toBe(0);
  expect(alias.pattern).toBe(`new Core.ExpectUnitPattern('@')`);

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.identity).toBe(1);
  expect(token.pattern).toBe(`new Core.EmitTokenPattern(${token.identity}, ALIAS)`);
});

test("Output a 'TOKEN' rule with a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token TOKEN as '@' & opt TOKEN;");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.identity).toBe(0);
  expect(token.pattern).toBe(
    `new Core.EmitTokenPattern(${token.identity}, ` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('@'), ` +
      /******/ `new Core.OptFlowPattern(` +
      /**********/ `new Core.RunFlowPattern(() => TOKEN)` +
      /******/ `)` +
      /**/ `)` +
      `)`
  );

  const link = project.tokenEntries.get(`@REF${token.identity}`)!;
  expect(link).toBeDefined();
  expect(link.identity).toBe(token.identity);
  expect(link.pattern).toBe('TOKEN');
});

test("Output a 'TOKEN' rule with an alias token that has a reference to itself", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "alias token ALIAS as '@' & opt ALIAS; token TOKEN as ALIAS;");

  // Check the output code.
  const alias = project.tokenEntries.get('ALIAS')!;
  expect(alias).toBeDefined();
  expect(alias.identity).toBe(0);
  expect(alias.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.RunFlowPattern(() => ALIAS)` +
      /**/ `)` +
      `)`
  );

  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.identity).toBe(1);
  expect(token.pattern).toBe(`new Core.EmitTokenPattern(${token.identity}, ALIAS)`);
});

test("Output a 'TOKEN' rule with a whole token map reference", () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    "alias token TOKEN1 as map { <100> A as 'a', <101> B as 'b' }; token <auto> TOKEN2 as TOKEN1 & '!';"
  );

  // Check the output code.
  const tokenRouteA = project.tokenEntries.get('TOKEN1@A')!;
  expect(tokenRouteA).toBeDefined();
  expect(tokenRouteA.identity).toBe(100);

  const tokenRouteB = project.tokenEntries.get('TOKEN1@B')!;
  expect(tokenRouteB).toBeDefined();
  expect(tokenRouteB.identity).toBe(101);

  const token1 = project.tokenEntries.get('TOKEN1')!;
  expect(token1).toBeDefined();
  expect(token1.identity).toBe(0);
  expect(token1.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.SetValueRoute(${tokenRouteA.identity}, 'a'), ` +
      /**/ `new Core.SetValueRoute(${tokenRouteB.identity}, 'b')` +
      `)`
  );

  const token2 = project.tokenEntries.get('TOKEN2')!;
  expect(token2).toBeDefined();
  expect(token2.identity).toBe(Core.BaseSource.Output);
  expect(token2.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.ExpectFlowPattern(TOKEN1, ` +
      /******/ `new Core.ExpectUnitPattern('!')` +
      /**/ `)` +
      `)`
  );
});

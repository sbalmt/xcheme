import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output a 'MAP' pattern", () => {
  const input = "skip map { 'a', 'b', 'c' };";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.UnitRoute('a'), ` +
      /**/ `new Core.UnitRoute('b'), ` +
      /**/ `new Core.UnitRoute('c')` +
      `)`
  );
});

test("Output a 'MAP' pattern with a nested map pattern", () => {
  const input = "skip map { 'a' & map { '1', '2' }, 'b', 'c' };";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.FlowRoute(` +
      /******/ `new Core.MapFlowPattern(` +
      /********/ `new Core.UnitRoute('1'), ` +
      /********/ `new Core.UnitRoute('2')` +
      /******/ `), ` +
      /**/ `'a'), ` +
      /**/ `new Core.UnitRoute('b'), ` +
      /**/ `new Core.UnitRoute('c')` +
      `)`
  );
});

test("Output a 'MAP' pattern with compound patterns", () => {
  const input = "skip map { 'a' & opt 'b' & repeat 'c' };";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.FlowRoute(` +
      /******/ `new Core.ExpectFlowPattern(` +
      /********/ `new Core.OptFlowPattern(new Core.ExpectUnitPattern('b')), ` +
      /********/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('c'))` +
      /******/ `), ` +
      /**/ `'a')` +
      `)`
  );
});

test("Output a 'MAP' pattern with a token pattern", () => {
  const input = "token <auto> TOKEN as map { <100> A as 'a', 'b', 'c' };";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const routeA = project.symbols.get('TOKEN@A')!;
  expect(routeA).toBeDefined();
  expect(routeA.data.identity).toBe(100);

  const rule = project.symbols.get('TOKEN')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(Core.BaseSource.Output);
  expect(rule.data.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${routeA.data.identity}, 'a'), ` +
      /******/ `new Core.SetValueRoute(${rule.data.identity}, 'b'), ` +
      /******/ `new Core.SetValueRoute(${rule.data.identity}, 'c')` +
      /**/ `)` +
      `)`
  );
});

test("Output a 'MAP' pattern with a node pattern", () => {
  const input = "node <auto> NODE as map { <100> A as 'a', 'b', 'c' };";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const token1 = project.symbols.get('@REF0')!; // 'a'
  expect(token1).toBeDefined();
  expect(token1.data.identity).toBe(0);

  const token2 = project.symbols.get('@REF1')!; // 'b'
  expect(token2).toBeDefined();
  expect(token2.data.identity).toBe(1);

  const token3 = project.symbols.get('@REF2')!; // 'c'
  expect(token3).toBeDefined();
  expect(token3.data.identity).toBe(2);

  const routeA = project.symbols.get('NODE@A')!;
  expect(routeA).toBeDefined();
  expect(routeA.data.identity).toBe(100);

  const rule = project.symbols.get('NODE')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(Core.BaseSource.Output);
  expect(rule.data.pattern).toBe(
    `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${routeA.data.identity}, ${token1.data.identity}), ` +
      /******/ `new Core.SetValueRoute(${rule.data.identity}, ${token2.data.identity}), ` +
      /******/ `new Core.SetValueRoute(${rule.data.identity}, ${token3.data.identity})` +
      /**/ `)` +
      `)`
  );
});

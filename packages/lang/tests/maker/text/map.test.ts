import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a skip 'MAP' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip map { 'a', 'b', 'c' };");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.UnitRoute('a'), ` +
      /**/ `new Core.UnitRoute('b'), ` +
      /**/ `new Core.UnitRoute('c')` +
      `)`
  );
});

test("Output a token 'MAP' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token TOKEN as map { <100> A as 'a', 'b', 'c' };");

  // Check the output code.
  const routeA = project.tokenEntries.get('TOKEN@A')!;
  expect(routeA).toBeDefined();
  expect(routeA.identity).toBe(100);

  const rule = project.tokenEntries.get('TOKEN')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${routeA.identity}, 'a'), ` +
      /******/ `new Core.SetValueRoute(${rule.identity}, 'b'), ` +
      /******/ `new Core.SetValueRoute(${rule.identity}, 'c')` +
      /**/ `)` +
      `)`
  );
});

test("Output a nested 'MAP' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip map { 'a' & map { '1', '2' }, 'b', 'c' };");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
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

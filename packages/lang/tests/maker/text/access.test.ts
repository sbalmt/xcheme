import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a token 'ACCESS' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "token TOKEN as map { <100> A as 'a' }; node NODE as TOKEN.A;");

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${100}, 'a')` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, new Core.ExpectUnitPattern(100))`);
});

test("Output a nested token 'ACCESS' rule", () => {
  const project = Helper.makeParser(
    new Lang.TextCoder(),
    "token TOKEN as map { <100> A as 'a' & map { <200> B as 'b', C as 'c' } }; node NODE as TOKEN.A.B;"
  );

  // Check the output code.
  const token = project.tokenEntries.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.FlowRoute(` +
      /********/ `new Core.MapFlowPattern(` +
      /**********/ `new Core.SetValueRoute(${200}, 'b'), ` +
      /**********/ `new Core.SetValueRoute(${100}, 'c')` +
      /********/ `), ` +
      /******/ `'a')` +
      /**/ `)` +
      `)`
  );

  const node = project.nodeEntries.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.pattern).toBe(`new Core.EmitNodePattern(${node.identity}, 1, new Core.ExpectUnitPattern(200))`);
});

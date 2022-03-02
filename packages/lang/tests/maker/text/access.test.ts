import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output an 'ACCESS' pattern with a token map", () => {
  const input = "token <auto> TOKEN as map { <100> A as 'a' }; node NODE as TOKEN.A;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const route = project.symbols.get('TOKEN@A')!;
  expect(route).toBeDefined();
  expect(route.data.identity).toBe(100);

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(Core.BaseSource.Output);
  expect(token.data.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.SetValueRoute(${route.data.identity}, 'a')` +
      /**/ `)` +
      `)`
  );

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(0);
  expect(node.data.pattern).toBe(
    `new Core.EmitNodePattern(${node.data.identity}, 1, new Core.ExpectUnitPattern(${route.data.identity}))`
  );
});

test("Output an 'ACCESS' pattern with a nested token map", () => {
  const input =
    "token <auto> TOKEN as map { <100> A as 'a' & map { <200> B as 'b', C as 'c' } }; node NODE as TOKEN.A.B;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const routeA = project.symbols.get('TOKEN@A')!;
  expect(routeA).toBeDefined();
  expect(routeA.data.identity).toBe(100);

  const routeAB = project.symbols.get('TOKEN@A@B')!;
  expect(routeAB).toBeDefined();
  expect(routeAB.data.identity).toBe(200);

  const routeAC = project.symbols.get('TOKEN@A@C')!;
  expect(routeAC).toBeDefined();
  expect(routeAC.data.identity).toBe(100);

  const token = project.symbols.get('TOKEN')!;
  expect(token).toBeDefined();
  expect(token.data.identity).toBe(Core.BaseSource.Output);
  expect(token.data.pattern).toBe(
    `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.FlowRoute(` +
      /********/ `new Core.MapFlowPattern(` +
      /**********/ `new Core.SetValueRoute(${routeAB.data.identity}, 'b'), ` +
      /**********/ `new Core.SetValueRoute(${routeAC.data.identity}, 'c')` +
      /********/ `), ` +
      /******/ `'a')` +
      /**/ `)` +
      `)`
  );

  const node = project.symbols.get('NODE')!;
  expect(node).toBeDefined();
  expect(node.data.identity).toBe(0);
  expect(node.data.pattern).toBe(
    `new Core.EmitNodePattern(${node.data.identity}, 1, new Core.ExpectUnitPattern(${routeAB.data.identity}))`
  );
});

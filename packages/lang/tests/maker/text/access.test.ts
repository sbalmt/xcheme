import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output an 'ACCESS' pattern in a token map", () => {
  Assert.output(
    `
    token <auto> TOKEN as map {
      <100> A as 'a'
    };
    node <200> NODE as TOKEN.A;`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(${Core.Source.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 'a')` +
        /**/ `)` +
        `)`,
      NODE: `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(100))`
    }
  );
});

test("Output an 'ACCESS' pattern in a nested token map", () => {
  Assert.output(
    `
    token <auto> TOKEN as map {
      <auto> A as 'a' & map {
        <100> B as 'b',
        <101> C as 'c'
      }
    };
    node <200> NODE_AB as TOKEN.A.B;
    node <201> NODE_AC as TOKEN.A.C;`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(${Core.Source.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.FlowRoute(` +
        /********/ `new Core.MapFlowPattern(` +
        /**********/ `new Core.SetValueRoute(100, 'b'), ` +
        /**********/ `new Core.SetValueRoute(101, 'c')` +
        /********/ `), ` +
        /******/ `'a')` +
        /**/ `)` +
        `)`,
      NODE_AB: `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(100))`,
      NODE_AC: `new Core.EmitNodePattern(201, 1, new Core.ExpectUnitPattern(101))`
    }
  );
});

test("Output an 'ACCESS' pattern in a post-declared token map", () => {
  Assert.output(
    `
    node <200> NODE as TOKEN.A;
    token <auto> TOKEN as map {
      <100> A as 'a'
    };`,
    {
      NODE: `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(100))`,
      TOKEN:
        `new Core.EmitTokenPattern(${Core.Source.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 'a')` +
        /**/ `)` +
        `)`
    }
  );
});

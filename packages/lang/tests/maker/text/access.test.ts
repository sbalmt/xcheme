import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output an 'ACCESS' pattern in a token map", () => {
  Assert.output(
    `
    token <auto> TOKEN as map {
      <100> A as 'a'
    };
    node NODE as TOKEN.A;`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 'a')` +
        /**/ `)` +
        `)`,
      NODE: `new Core.EmitNodePattern(0, 1, new Core.ExpectUnitPattern(100))`
    }
  );
});

test("Output an 'ACCESS' pattern in a nested token map", () => {
  Assert.output(
    `
    token <auto> TOKEN as map {
      <100> A as 'a' & map {
        <200> B as 'b',
              C as 'c'
      }
    };
    node NODE_AB as TOKEN.A.B;
    node NODE_AC as TOKEN.A.C;`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.FlowRoute(` +
        /********/ `new Core.MapFlowPattern(` +
        /**********/ `new Core.SetValueRoute(200, 'b'), ` +
        /**********/ `new Core.SetValueRoute(100, 'c')` +
        /********/ `), ` +
        /******/ `'a')` +
        /**/ `)` +
        `)`,
      NODE_AB: `new Core.EmitNodePattern(0, 1, new Core.ExpectUnitPattern(200))`,
      NODE_AC: `new Core.EmitNodePattern(1, 1, new Core.ExpectUnitPattern(100))`
    }
  );
});

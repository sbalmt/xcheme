import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output a 'MAP' pattern", () => {
  Assert.output(
    `
    skip map {
      'a',
      'b',
      'c'
    };`,
    {
      '@SKIP0':
        `new Core.MapFlowPattern(` +
        /**/ `new Core.UnitRoute('a'), ` +
        /**/ `new Core.UnitRoute('b'), ` +
        /**/ `new Core.UnitRoute('c')` +
        `)`
    }
  );
});

test("Output a 'MAP' pattern with compound patterns", () => {
  Assert.output(
    `
    skip map {
      'a' & opt 'b' & repeat 'c'
    };`,
    {
      '@SKIP0':
        `new Core.MapFlowPattern(` +
        /**/ `new Core.FlowRoute(` +
        /******/ `new Core.ExpectFlowPattern(` +
        /********/ `new Core.OptFlowPattern(new Core.ExpectUnitPattern('b')), ` +
        /********/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('c'))` +
        /******/ `), ` +
        /**/ `'a')` +
        `)`
    }
  );
});

test("Output a 'MAP' pattern with a nested map pattern", () => {
  Assert.output(
    `
    skip map {
      'a' & map {
        '1',
        '2'
      },
      'b',
      'c'
    };`,
    {
      '@SKIP0':
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
    }
  );
});

test("Output a 'MAP' pattern in a token directive", () => {
  Assert.output(
    `
    token <auto> TOKEN as map {
      <100> A as 'a',
                 'b',
                 'c'
    };`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 'a'), ` +
        /******/ `new Core.SetValueRoute(${Core.BaseSource.Output}, 'b'), ` +
        /******/ `new Core.SetValueRoute(${Core.BaseSource.Output}, 'c')` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'MAP' pattern in a node directive", () => {
  Assert.output(
    `
    node <auto> NODE as map {
      <100> A as 'a',
                 'b',
                 'c'
    };`,
    {
      NODE:
        `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 0), ` +
        /******/ `new Core.SetValueRoute(${Core.BaseSource.Output}, 1), ` +
        /******/ `new Core.SetValueRoute(${Core.BaseSource.Output}, 2)` +
        /**/ `)` +
        `)`
    }
  );
});

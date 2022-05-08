import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test('Output a MAP pattern', () => {
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

test('Output a MAP pattern using multiple optimized nodes', () => {
  Assert.output(
    `
    skip map {
      'a' & append <50> 'b' & 'c'
    };`,
    {
      '@SKIP0':
        `new Core.MapFlowPattern(` +
        /**/ `new Core.FlowRoute(` +
        /******/ `new Core.ExpectFlowPattern(` +
        /**********/ `new Core.AppendNodePattern(50, 1, 1, new Core.ExpectUnitPattern('b')` +
        /******/ `), ` +
        /******/ `new Core.ExpectUnitPattern('c')), ` +
        /**/ `'a')` +
        `)`
    }
  );
});

test('Output a MAP pattern with compound patterns', () => {
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

test('Output a MAP pattern with a nested map pattern', () => {
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

test('Output a MAP pattern with a template reference', () => {
  Assert.output(
    `
    alias <X>
    token <X> FOO as 'foo';

    skip map {
      'bar' & FOO <10>
    };`,
    {
      '@SKIP0':
        `new Core.MapFlowPattern(` +
        /**/ `new Core.FlowRoute(` +
        /******/ `new Core.UseValuePattern(10, new Core.ExpectUnitPattern('f', 'o', 'o')), 'b', 'a', 'r'` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a MAP pattern in a TOKEN directive', () => {
  Assert.output(
    `
    token <100> TOKEN as map {
      'a',
      'b',
      'c'
    };`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(100, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.UnitRoute('a'), ` +
        /******/ `new Core.UnitRoute('b'), ` +
        /******/ `new Core.UnitRoute('c')` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a MAP pattern in a dynamic TOKEN directive', () => {
  Assert.output(
    `
    token <auto> TOKEN as map {
      <100> A as 'a',
            B as 'b',
            C as 'c'
    };`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(${Core.Source.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 'a'), ` +
        /******/ `new Core.SetValueRoute(0, 'b'), ` +
        /******/ `new Core.SetValueRoute(1, 'c')` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a MAP pattern in an ALIAS TOKEN directive', () => {
  Assert.output(
    `
    alias token <100> ALIAS as map {
      <101> A as 'a',
            B as 'b',
                 'c'
    };`,
    {
      ALIAS:
        `new Core.MapFlowPattern(` +
        /**/ `new Core.SetValueRoute(101, 'a'), ` +
        /**/ `new Core.SetValueRoute(0, 'b'), ` +
        /**/ `new Core.UnitRoute('c')` +
        `)`
    }
  );
});

test('Output a MAP pattern in a NODE directive', () => {
  Assert.output(
    `
    node <auto> NODE as map {
      <100> A as 'a',
            B as 'b',
            C as 'c'
    };`,
    {
      NODE:
        `new Core.EmitNodePattern(${Core.Source.Output}, 1, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 0), ` +
        /******/ `new Core.SetValueRoute(1, 2), ` +
        /******/ `new Core.SetValueRoute(3, 4)` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a MAP pattern in an ALIAS NODE directive', () => {
  Assert.output(
    `
    alias node <100> ALIAS as map {
      <101> A as 'a',
            B as 'b',
                 'c'
    };`,
    {
      ALIAS:
        `new Core.MapFlowPattern(` +
        /**/ `new Core.SetValueRoute(101, 0), ` +
        /**/ `new Core.SetValueRoute(1, 2), ` +
        /**/ `new Core.UnitRoute(3)` +
        `)`
    }
  );
});

test('Output a MAP pattern in a NODE directive using access expressions', () => {
  Assert.output(
    `
    token <auto> TOKEN as map {
      <100> A as 'a',
      <101> B as 'b',
            C as 'c'
    };
    node <auto> NODE as map {
      <200> A as TOKEN.A & TOKEN.C,
      <201> B as TOKEN.B & TOKEN.C
    };`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(${Core.Source.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 'a'), ` +
        /******/ `new Core.SetValueRoute(101, 'b'), ` +
        /******/ `new Core.SetValueRoute(0, 'c')` +
        /**/ `)` +
        `)`,
      NODE:
        `new Core.EmitNodePattern(${Core.Source.Output}, 1, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(200, 100, 0), ` +
        /******/ `new Core.SetValueRoute(201, 101, 0)` +
        /**/ `)` +
        `)`
    }
  );
});

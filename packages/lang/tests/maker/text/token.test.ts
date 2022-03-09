import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output a 'TOKEN' pattern", () => {
  Assert.output(
    `
    token TOKEN as '@';`,
    {
      TOKEN: `new Core.EmitTokenPattern(0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'TOKEN' pattern with an alias token reference", () => {
  Assert.output(
    `
    alias token ALIAS as '@';
          token TOKEN as ALIAS;`,
    {
      ALIAS: `new Core.ExpectUnitPattern('@')`,
      TOKEN: `new Core.EmitTokenPattern(1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'TOKEN' pattern with a reference to itself", () => {
  Assert.output(
    `
    token TOKEN as '@' & opt TOKEN;`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(0, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('@'), ` +
        /******/ `new Core.OptFlowPattern(` +
        /**********/ `new Core.RunFlowPattern(() => L0_TOKEN)` +
        /******/ `)` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'TOKEN' pattern with an alias token that has a reference to itself", () => {
  Assert.output(
    `
    alias token ALIAS as '@' & opt ALIAS;
          token TOKEN as ALIAS;`,
    {
      ALIAS:
        `new Core.ExpectFlowPattern(` +
        /**/ `new Core.ExpectUnitPattern('@'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.RunFlowPattern(() => L0_ALIAS)` +
        /**/ `)` +
        `)`,
      TOKEN: `new Core.EmitTokenPattern(1, L0_ALIAS)`
    }
  );
});

test("Output a 'TOKEN' pattern with a whole token map reference", () => {
  Assert.output(
    `
    alias token <auto> ALIAS as map {
      <100> A as 'a',
      <101> B as 'b'
    };
    token <auto> TOKEN as ALIAS & '!';`,
    {
      ALIAS:
        `new Core.MapFlowPattern(` +
        /**/ `new Core.SetValueRoute(100, 'a'), ` +
        /**/ `new Core.SetValueRoute(101, 'b')` +
        `)`,
      TOKEN:
        `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.MapFlowPattern(` +
        /**********/ `new Core.SetValueRoute(100, 'a'), ` +
        /**********/ `new Core.SetValueRoute(101, 'b')` +
        /******/ `), ` +
        /******/ `new Core.ExpectUnitPattern('!')` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'TOKEN' pattern with an imported token alias directive", () => {
  Assert.output(
    `
    import './module2';
    token <3030> TOKEN as EXTERNAL_TOKEN1;`,
    {
      EXTERNAL_ISOLATED_TOKEN1: `L1_ALIAS_TOKEN`,
      EXTERNAL_ISOLATED_TOKEN2: `new Core.EmitTokenPattern(1013, L1_ALIAS_TOKEN)`,
      EXTERNAL_ISOLATED_NODE1: `L1_ALIAS_NODE`,
      EXTERNAL_ISOLATED_NODE2: `new Core.EmitNodePattern(2023, 1, L1_ALIAS_NODE)`,
      EXTERNAL_TOKEN1: `L2_ALIAS_TOKEN`,
      EXTERNAL_NODE1: `L2_ALIAS_NODE`,
      TOKEN: `new Core.EmitTokenPattern(3030, L2_ALIAS_TOKEN)`
    }
  );
});

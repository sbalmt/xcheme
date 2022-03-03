import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output a 'NODE' pattern with a loose token reference", () => {
  Assert.output(
    `
    node NODE as '@' & '@' & opt '@';`,
    {
      NODE:
        `new Core.EmitNodePattern(0, 1, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern(1, 1), ` +
        /******/ `new Core.OptFlowPattern(new Core.ExpectUnitPattern(1))` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'NODE' pattern with a loose token range reference", () => {
  Assert.output(
    `
    node NODE as from '0' to '9';`,
    {
      NODE: `new Core.EmitNodePattern(0, 1, new Core.ExpectUnitPattern(1))`
    }
  );
});

test("Output a 'NODE' pattern with a loose token map reference", () => {
  Assert.output(
    `
    node NODE as map {
      'a',
      'b'
    };`,
    {
      NODE:
        `new Core.EmitNodePattern(0, 1, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(0, 1), ` +
        /******/ `new Core.SetValueRoute(0, 2)` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'NODE' pattern with a token reference", () => {
  Assert.output(
    `
    token TOKEN as '@';
    node  NODE  as TOKEN;`,
    {
      NODE: `new Core.EmitNodePattern(1, 1, new Core.ExpectUnitPattern(0))`
    }
  );
});

test("Output a 'NODE' pattern with an alias node reference", () => {
  Assert.output(
    `
    alias node ALIAS as '@';
          node NODE  as ALIAS;`,
    {
      NODE: `new Core.EmitNodePattern(2, 1, new Core.ExpectUnitPattern(1))`
    }
  );
});

test("Output a 'NODE' pattern with a reference to itself", () => {
  Assert.output(
    `
    node NODE as '@' & opt NODE;`,
    {
      NODE:
        `new Core.EmitNodePattern(0, 1, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern(1), ` +
        /******/ `new Core.OptFlowPattern(` +
        /**********/ `new Core.RunFlowPattern(() => L0_NODE)` +
        /******/ `)` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'NODE' pattern with an alias node that has a reference to itself", () => {
  Assert.output(
    `
    alias node ALIAS as '@' & opt ALIAS;
          node NODE  as ALIAS;`,
    {
      ALIAS:
        `new Core.ExpectFlowPattern(` +
        /**/ `new Core.ExpectUnitPattern(1), ` +
        /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_ALIAS)` +
        /**/ `)` +
        `)`,
      NODE: `new Core.EmitNodePattern(2, 1, L0_ALIAS)`
    }
  );
});

test("Output a 'NODE' pattern with token map entry references", () => {
  Assert.output(
    `
    token <auto> TOKEN as map {
      <100> A as 'a',
      <101> B as 'b'
    };
    node <auto> NODE as map {
      <200> A as TOKEN.A,
      <201> B as TOKEN.B
    };`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(${Core.BaseSource.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 'a'), ` +
        /******/ `new Core.SetValueRoute(101, 'b')` +
        /**/ `)` +
        `)`,
      NODE:
        `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(200, 100), ` +
        /******/ `new Core.SetValueRoute(201, 101)` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'NODE' pattern with a whole node map reference", () => {
  Assert.output(
    `
    alias node ALIAS as map {
      <200> A as 'a',
      <201> B as 'b'
    };
    node <auto> NODE as ALIAS & '!';`,
    {
      ALIAS:
        `new Core.MapFlowPattern(` +
        /**/ `new Core.SetValueRoute(200, 1), ` +
        /**/ `new Core.SetValueRoute(201, 2)` +
        `)`,
      NODE:
        `new Core.EmitNodePattern(${Core.BaseSource.Output}, 1, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.MapFlowPattern(` +
        /**********/ `new Core.SetValueRoute(200, 1), ` +
        /**********/ `new Core.SetValueRoute(201, 2)` +
        /******/ `), ` +
        /******/ `new Core.ExpectUnitPattern(3)` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'NODE' pattern with an imported node alias directive", () => {
  Assert.output(
    `
    import './module2';
    node <4040> NODE as EXTERNAL_NODE1;`,
    {
      EXTERNAL_ISOLATED_TOKEN1: `L1_ALIAS_TOKEN`,
      EXTERNAL_ISOLATED_TOKEN2: `new Core.EmitTokenPattern(1013, L1_ALIAS_TOKEN)`,
      EXTERNAL_ISOLATED_NODE1: `L1_ALIAS_NODE`,
      EXTERNAL_ISOLATED_NODE2: `new Core.EmitNodePattern(2023, 1, L1_ALIAS_NODE)`,
      EXTERNAL_TOKEN1: `L2_ALIAS_TOKEN`,
      EXTERNAL_NODE1: `L2_ALIAS_NODE`,
      NODE: `new Core.EmitNodePattern(4040, 1, L2_ALIAS_NODE)`
    }
  );
});

test("Output a 'NODE' pattern with an imported token directive", () => {
  Assert.output(
    `
    import './module2';
    node <4040> NODE as EXTERNAL_ISOLATED_TOKEN2;`,
    {
      EXTERNAL_ISOLATED_TOKEN1: `L1_ALIAS_TOKEN`,
      EXTERNAL_ISOLATED_TOKEN2: `new Core.EmitTokenPattern(1013, L1_ALIAS_TOKEN)`,
      EXTERNAL_ISOLATED_NODE1: `L1_ALIAS_NODE`,
      EXTERNAL_ISOLATED_NODE2: `new Core.EmitNodePattern(2023, 1, L1_ALIAS_NODE)`,
      EXTERNAL_TOKEN1: `L2_ALIAS_TOKEN`,
      EXTERNAL_NODE1: `L2_ALIAS_NODE`,
      NODE: `new Core.EmitNodePattern(4040, 1, new Core.ExpectUnitPattern(1013))`
    }
  );
});

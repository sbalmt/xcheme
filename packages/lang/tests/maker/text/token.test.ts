import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output a 'TOKEN' pattern", () => {
  Assert.output(
    `
    token <100> TOKEN as '@';`,
    {
      TOKEN: `new Core.EmitTokenPattern(100, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'TOKEN' pattern with zero identity", () => {
  Assert.output(
    `
    token <0> TOKEN as '@';`,
    {
      TOKEN: `new Core.EmitTokenPattern(0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'TOKEN' pattern with a pre-declared token reference", () => {
  Assert.output(
    `
    token <100> TOKEN_1 as 'foo';
    token <101> TOKEN_2 as 'bar' & TOKEN_1;`,
    {
      TOKEN_1: `new Core.EmitTokenPattern(100, new Core.ExpectUnitPattern('f', 'o', 'o'))`,
      TOKEN_2:
        `new Core.EmitTokenPattern(101, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /**/ `new Core.ExpectUnitPattern('b', 'a', 'r'), ` +
        /**/ `new Core.EmitTokenPattern(100, ` +
        /******/ `new Core.ExpectUnitPattern('f', 'o', 'o'))` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'TOKEN' pattern with a post-declared token reference", () => {
  Assert.output(
    `
    token <100> TOKEN_1 as 'bar' & TOKEN_2;
    token <101> TOKEN_2 as 'foo';`,
    {
      TOKEN_1:
        `new Core.EmitTokenPattern(100, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('b', 'a', 'r'), new Core.RunFlowPattern(() => L0_TOKEN_2)` +
        /**/ `)` +
        `)`,
      TOKEN_2: `new Core.EmitTokenPattern(101, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test("Output a 'TOKEN' pattern with an alias token reference", () => {
  Assert.output(
    `
    token <100> TOKEN as ALIAS;
    alias token ALIAS as 'foo';`,
    {
      ALIAS: `new Core.ExpectUnitPattern('f', 'o', 'o')`,
      TOKEN: `new Core.EmitTokenPattern(100, new Core.RunFlowPattern(() => L0_ALIAS))`
    }
  );
});

test("Output a 'TOKEN' pattern with a template token reference", () => {
  Assert.output(
    `
    alias <X, Y>
    token TEMPLATE as set<X> repeat Y;

    alias token ALIAS as 'foo';
    token <100> TOKEN as TEMPLATE <50, ALIAS>;`,
    {
      TEMPLATE: void 0,
      '@TEMPLATE:50:ALIAS': `new Core.SetStatePattern(50, new Core.RepeatFlowPattern(L0_ALIAS))`,
      ALIAS: `new Core.ExpectUnitPattern('f', 'o', 'o')`,
      TOKEN: `new Core.EmitTokenPattern(100, new Core.SetStatePattern(50, new Core.RepeatFlowPattern(L0_ALIAS)))`
    }
  );
});

test("Output a 'TOKEN' pattern with multiple template token references", () => {
  Assert.output(
    `
    alias <X>
    token TEMPLATE as set <X> 'foo';

    token <100> TOKEN_1 as TEMPLATE <50>;
    token <101> TOKEN_2 as TEMPLATE <50>;`,
    {
      TEMPLATE: void 0,
      '@TEMPLATE:50': `new Core.SetStatePattern(50, new Core.ExpectUnitPattern('f', 'o', 'o'))`,
      TOKEN_1: `new Core.EmitTokenPattern(100, L0_TEMPLATE_50)`,
      TOKEN_2: `new Core.EmitTokenPattern(101, L0_TEMPLATE_50)`
    }
  );
});

test("Output a 'TOKEN' pattern with a reference to itself", () => {
  Assert.output(
    `
    token <100> TOKEN as '@' & opt TOKEN;`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(100, ` +
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
    token <100> TOKEN as ALIAS;`,
    {
      ALIAS:
        `new Core.ExpectFlowPattern(` +
        /**/ `new Core.ExpectUnitPattern('@'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.RunFlowPattern(() => L0_ALIAS)` +
        /**/ `)` +
        `)`,
      TOKEN: `new Core.EmitTokenPattern(100, L0_ALIAS)`
    }
  );
});

test("Output a 'TOKEN' pattern referencing a template token and passing itself as an argument", () => {
  Assert.output(
    `
    alias <X>
    token TEMPLATE as 'foo' & opt X;

    token <100> TOKEN as TEMPLATE <TOKEN>;`,
    {
      TEMPLATE: void 0,
      '@TEMPLATE:TOKEN':
        `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('f', 'o', 'o'), ` +
        /**/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_TOKEN))` +
        `)`,
      TOKEN: `new Core.EmitTokenPattern(100, L0_TEMPLATE_TOKEN)`
    }
  );
});

test("Output a 'TOKEN' pattern with a whole token map reference", () => {
  Assert.output(
    `
    alias token ALIAS as map {
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
        `new Core.EmitTokenPattern(${Core.Source.Output}, ` +
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
    token <150> TOKEN as EXTERNAL_TOKEN1;`,
    {
      EXTERNAL_ISOLATED_TOKEN1: `L1_ALIAS_TOKEN`,
      EXTERNAL_ISOLATED_TOKEN2: `new Core.EmitTokenPattern(101, L1_ALIAS_TOKEN)`,
      EXTERNAL_ISOLATED_NODE1: `L1_ALIAS_NODE`,
      EXTERNAL_ISOLATED_NODE2: `new Core.EmitNodePattern(201, 1, L1_ALIAS_NODE)`,
      EXTERNAL_TOKEN1: `L2_ALIAS_TOKEN`,
      EXTERNAL_NODE1: `L2_ALIAS_NODE`,
      TOKEN: `new Core.EmitTokenPattern(150, L2_ALIAS_TOKEN)`
    }
  );
});

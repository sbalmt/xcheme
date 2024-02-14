import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test('Output a NODE pattern with zero identity', () => {
  Assert.output(
    `
    token <100> TOKEN as 'a';
    node  <0>   NODE  as TOKEN;`,
    {
      TOKEN: `new Core.EmitTokenPattern(100, new Core.ExpectUnitPattern('a'))`,
      NODE: `new Core.EmitNodePattern(0, 1, new Core.ExpectUnitPattern(100))`
    }
  );
});

test('Output a NODE pattern with a loose token reference', () => {
  Assert.output(
    `
    node <200> NODE as '@' & '@' & opt '@';`,
    {
      NODE:
        `new Core.EmitNodePattern(200, 1, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern(0, 0), ` +
        /******/ `new Core.OptFlowPattern(new Core.ExpectUnitPattern(0))` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a NODE pattern with a loose token range reference', () => {
  Assert.output(
    `
    node <200> NODE as from '0' to '9';`,
    {
      NODE: `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(0))`
    }
  );
});

test('Output a NODE pattern with a loose TOKEN map reference', () => {
  Assert.output(
    `
    node <200> NODE as map {
      'a',
      'b'
    };`,
    {
      NODE:
        `new Core.EmitNodePattern(200, 1, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.UnitRoute(0), ` +
        /******/ `new Core.UnitRoute(1)` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a NODE pattern with a pre-declared token reference', () => {
  Assert.output(
    `
    token <100> TOKEN as 'foo';
    node  <200> NODE  as TOKEN;`,
    {
      TOKEN: `new Core.EmitTokenPattern(100, new Core.ExpectUnitPattern('f', 'o', 'o'))`,
      NODE: `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(100))`
    }
  );
});

test('Output a NODE pattern with a post-declared token reference', () => {
  Assert.output(
    `
    node  <200> NODE  as TOKEN;
    token <100> TOKEN as 'foo';`,
    {
      NODE: `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(100))`,
      TOKEN: `new Core.EmitTokenPattern(100, new Core.ExpectUnitPattern('f', 'o', 'o'))`
    }
  );
});

test('Output a NODE pattern with an alias node reference', () => {
  Assert.output(
    `
    alias node ALIAS as 'foo';
    node <200> NODE  as ALIAS;`,
    {
      ALIAS: `new Core.ExpectUnitPattern(0)`,
      NODE: `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(0))`
    }
  );
});

test('Output a NODE pattern with a template alias node reference', () => {
  Assert.output(
    `
    alias <X, Y>
    node TEMPLATE as set <X> repeat Y;

    alias node ALIAS as 'foo';
    node <200> NODE  as TEMPLATE <50, ALIAS>;`,
    {
      TEMPLATE: void 0,
      '@TEMPLATE:50:ALIAS': `new Core.SetStatePattern(50, new Core.RepeatFlowPattern(new Core.RunFlowPattern(() => L0_ALIAS)))`,
      ALIAS: `new Core.ExpectUnitPattern(0)`,
      NODE:
        `new Core.EmitNodePattern(200, 1, ` +
        /**/ `new Core.SetStatePattern(50, ` +
        /******/ `new Core.RepeatFlowPattern(new Core.RunFlowPattern(() => L0_ALIAS))` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a NODE pattern with multiple template alias node references', () => {
  Assert.output(
    `
    alias <X>
    node TEMPLATE as set <X> 'foo';

    node <200> NODE_1 as TEMPLATE <50>;
    node <201> NODE_2 as TEMPLATE <50>;`,
    {
      TEMPLATE: void 0,
      '@TEMPLATE:50': `new Core.SetStatePattern(50, new Core.ExpectUnitPattern(0))`,
      NODE_1: `new Core.EmitNodePattern(200, 1, L0_TEMPLATE_50)`,
      NODE_2: `new Core.EmitNodePattern(201, 1, L0_TEMPLATE_50)`
    }
  );
});

test('Output a NODE pattern with a reference to itself', () => {
  Assert.output(
    `
    node <200> NODE as '@' & opt NODE;`,
    {
      NODE:
        `new Core.EmitNodePattern(200, 1, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern(0), ` +
        /******/ `new Core.OptFlowPattern(` +
        /**********/ `new Core.RunFlowPattern(() => L0_NODE)` +
        /******/ `)` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a NODE pattern with an alias node that has a reference to itself', () => {
  Assert.output(
    `
    alias node ALIAS as '@' & opt ALIAS;
    node <200> NODE  as ALIAS;`,
    {
      ALIAS:
        `new Core.ExpectFlowPattern(` +
        /**/ `new Core.ExpectUnitPattern(0), ` +
        /******/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_ALIAS)` +
        /**/ `)` +
        `)`,
      NODE: `new Core.EmitNodePattern(200, 1, L0_ALIAS)`
    }
  );
});

test('Output a NODE pattern referencing a template alias node and passing itself as an argument', () => {
  Assert.output(
    `
    alias <X>
    node TEMPLATE as 'foo' & opt X;

    node <200> NODE as TEMPLATE <NODE>;`,
    {
      TEMPLATE: void 0,
      '@TEMPLATE:NODE':
        `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(0), ` +
        /**/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_NODE))` +
        `)`,
      NODE: `new Core.EmitNodePattern(200, 1, L0_TEMPLATE_NODE)`
    }
  );
});

test('Output a NODE pattern referencing a template alias node that has a reference to itself', () => {
  Assert.output(
    `
    alias <X>
    node TEMPLATE as 'foo' & opt TEMPLATE <X>;

    node <200> NODE as TEMPLATE <100>;`,
    {
      TEMPLATE: void 0,
      '@TEMPLATE:100':
        `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern(0), ` +
        /**/ `new Core.OptFlowPattern(new Core.RunFlowPattern(() => L0_TEMPLATE_100))` +
        `)`,
      NODE: `new Core.EmitNodePattern(200, 1, L0_TEMPLATE_100)`
    }
  );
});

test('Output a NODE pattern with TOKEN map entry references', () => {
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
        `new Core.EmitTokenPattern(${Core.Source.Output}, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(100, 'a'), ` +
        /******/ `new Core.SetValueRoute(101, 'b')` +
        /**/ `)` +
        `)`,
      NODE:
        `new Core.EmitNodePattern(${Core.Source.Output}, 1, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.SetValueRoute(200, 100), ` +
        /******/ `new Core.SetValueRoute(201, 101)` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a NODE pattern with a whole ALIAS NODE map reference', () => {
  Assert.output(
    `
    alias node <auto> ALIAS as map {
      <200> A as 'a',
      <201> B as 'b'
    };
    node <auto> NODE as ALIAS & '!';`,
    {
      ALIAS:
        `new Core.MapFlowPattern(` +
        /**/ `new Core.SetValueRoute(200, 0), ` +
        /**/ `new Core.SetValueRoute(201, 1)` +
        `)`,
      NODE:
        `new Core.EmitNodePattern(${Core.Source.Output}, 1, ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.MapFlowPattern(` +
        /**********/ `new Core.SetValueRoute(200, 0), ` +
        /**********/ `new Core.SetValueRoute(201, 1)` +
        /******/ `), ` +
        /******/ `new Core.ExpectUnitPattern(2)` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a NODE pattern with an imported node alias directive', () => {
  Assert.output(
    `
    import './module2';
    node <250> NODE as EXTERNAL_NODE1;`,
    {
      EXTERNAL_ISOLATED_TOKEN1: `L1_ALIAS_TOKEN`,
      EXTERNAL_ISOLATED_TOKEN2: `new Core.EmitTokenPattern(101, L1_ALIAS_TOKEN)`,
      EXTERNAL_ISOLATED_NODE1: `L1_ALIAS_NODE`,
      EXTERNAL_ISOLATED_NODE2: `new Core.EmitNodePattern(201, 1, L1_ALIAS_NODE)`,
      EXTERNAL_TOKEN1: `L2_ALIAS_TOKEN`,
      EXTERNAL_NODE1: `L2_ALIAS_NODE`,
      NODE: `new Core.EmitNodePattern(250, 1, L2_ALIAS_NODE)`
    }
  );
});

test('Output a NODE pattern with an imported token directive', () => {
  Assert.output(
    `
    import './module2';
    node <250> NODE as EXTERNAL_ISOLATED_TOKEN2;`,
    {
      EXTERNAL_ISOLATED_TOKEN1: `L1_ALIAS_TOKEN`,
      EXTERNAL_ISOLATED_TOKEN2: `new Core.EmitTokenPattern(101, L1_ALIAS_TOKEN)`,
      EXTERNAL_ISOLATED_NODE1: `L1_ALIAS_NODE`,
      EXTERNAL_ISOLATED_NODE2: `new Core.EmitNodePattern(201, 1, L1_ALIAS_NODE)`,
      EXTERNAL_TOKEN1: `L2_ALIAS_TOKEN`,
      EXTERNAL_NODE1: `L2_ALIAS_NODE`,
      NODE: `new Core.EmitNodePattern(250, 1, new Core.ExpectUnitPattern(101))`
    }
  );
});

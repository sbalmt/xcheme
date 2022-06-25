import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test('Output a PIVOT pattern with an identity', () => {
  Assert.output(
    `
    skip pivot <50> '@';`,
    {
      '@SKIP0': `new Core.PivotNodePattern(50, 1, 0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test('Output a PIVOT pattern with an auto identity', () => {
  Assert.output(
    `
    alias token <50> ALIAS as '@';
    skip pivot <auto> ALIAS;`,
    {
      '@SKIP0':
        `new Core.PivotNodePattern(${Core.Source.Output}, 1, 0, ` +
        /**/ `new Core.UseValuePattern(50, new Core.ExpectUnitPattern('@'))` +
        `)`
    }
  );
});

test('Output a PIVOT pattern without a self identity', () => {
  Assert.output(
    `
    token <50> TOKEN as pivot '@';`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(50, ` +
        /**/ `new Core.PivotNodePattern(50, 1, 0, new Core.ExpectUnitPattern('@'))` +
        `)`
    }
  );
});

test('Output a PIVOT without a self identity in a MAP operand', () => {
  Assert.output(
    `
    alias token <auto> ALIAS as map {
      ENTRY as 'foo' & pivot 'bar'
    };`,
    {
      ALIAS:
        `new Core.MapFlowPattern(` +
        /**/ `new Core.SetValueRoute(0, ` +
        /******/ `new Core.PivotNodePattern(0, 1, 0, new Core.ExpectUnitPattern('b', 'a', 'r')), 'f', 'o', 'o'` +
        /**/ `)` +
        `)`
    }
  );
});

test('Output a PIVOT pattern with multiple patterns', () => {
  Assert.output(
    `
    skip pivot <50> ('@' | '*');`,
    {
      '@SKIP0': `new Core.PivotNodePattern(50, 1, 0, new Core.ChooseUnitPattern('@', '*'))`
    }
  );
});

test('Output a PIVOT pattern with chained patterns', () => {
  Assert.output(
    `
    skip pivot <50> ('@' & '*' & '*' & opt '!');`,
    {
      '@SKIP0':
        `new Core.PivotNodePattern(50, 1, 0, ` +
        /**/ `new Core.ExpectUnitPattern('@'), ` +
        /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('!')` +
        /**/ `)` +
        `)`
    }
  );
});

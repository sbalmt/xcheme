import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output an 'APPEND' pattern without a self identity", () => {
  Assert.output(
    `
    token <50> TOKEN as append '@';`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(50, ` +
        /**/ `new Core.AppendNodePattern(50, 1, 1, new Core.ExpectUnitPattern('@'))` +
        `)`
    }
  );
});

test("Output an 'APPEND' pattern with an identity", () => {
  Assert.output(
    `
    skip append <50> '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(50, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output an 'APPEND' pattern with an auto identity", () => {
  Assert.output(
    `
    alias token <50> ALIAS as '@';
    skip append <auto> ALIAS;`,
    {
      '@SKIP0':
        `new Core.AppendNodePattern(${Core.Source.Output}, 1, 1, ` +
        /**/ `new Core.UseValuePattern(50, new Core.ExpectUnitPattern('@'))` +
        `)`
    }
  );
});

test("Output an 'APPEND' pattern with multiple patterns", () => {
  Assert.output(
    `
    skip append <50> ('@' | '*');`,
    {
      '@SKIP0': `new Core.AppendNodePattern(50, 1, 1, new Core.ChooseUnitPattern('@', '*'))`
    }
  );
});

test("Output an 'APPEND' pattern with chained patterns", () => {
  Assert.output(
    `
    skip append <50> ('@' & '*' & '*' & opt '!');`,
    {
      '@SKIP0':
        `new Core.AppendNodePattern(50, 1, 1, ` +
        /**/ `new Core.ExpectUnitPattern('@'), ` +
        /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('!')` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output an 'APPEND LEFT' pattern", () => {
  Assert.output(
    `
    skip append <50> left '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(50, 1, 0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output an 'APPEND RIGHT' pattern", () => {
  Assert.output(
    `
    skip append <50> right '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(50, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output an 'APPEND NEXT' pattern", () => {
  Assert.output(
    `
    skip append <50> next '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(50, 1, 2, new Core.ExpectUnitPattern('@'))`
    }
  );
});

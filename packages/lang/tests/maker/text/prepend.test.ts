import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output a 'PREPEND' pattern without a self identity", () => {
  Assert.output(
    `
    token <50> TOKEN as prepend '@';`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(50, ` +
        /**/ `new Core.PrependNodePattern(50, 1, 1, new Core.ExpectUnitPattern('@'))` +
        `)`
    }
  );
});

test("Output a 'PREPEND' pattern with an identity", () => {
  Assert.output(
    `
    skip prepend <50> '@';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(50, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PREPEND' pattern with an auto identity", () => {
  Assert.output(
    `
    alias token <50> ALIAS as '@';
    skip prepend <auto> ALIAS;`,
    {
      '@SKIP0':
        `new Core.PrependNodePattern(${Core.BaseSource.Output}, 1, 1, ` +
        /**/ `new Core.UseValuePattern(50, new Core.ExpectUnitPattern('@'))` +
        `)`
    }
  );
});

test("Output a 'PREPEND' pattern with multiple patterns", () => {
  Assert.output(
    `
    skip prepend <50> ('@' | '*');`,
    {
      '@SKIP0': `new Core.PrependNodePattern(50, 1, 1, new Core.ChooseUnitPattern('@', '*'))`
    }
  );
});

test("Output a 'PREPEND' pattern with chained patterns", () => {
  Assert.output(
    `
    skip prepend <50> ('@' & '*' & '*' & opt '!');`,
    {
      '@SKIP0':
        `new Core.PrependNodePattern(50, 1, 1, ` +
        /**/ `new Core.ExpectUnitPattern('@'), ` +
        /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('!')` +
        /**/ `)` +
        `)`
    }
  );
});

test("Output a 'PREPEND LEFT' pattern", () => {
  Assert.output(
    `
    skip prepend <50> left '@';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(50, 1, 0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PREPEND RIGHT' pattern", () => {
  Assert.output(
    `
    skip prepend <50> right '@';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(50, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PREPEND NEXT' pattern", () => {
  Assert.output(
    `
    skip prepend <50> next '@';`,
    {
      '@SKIP0': `new Core.PrependNodePattern(50, 1, 2, new Core.ExpectUnitPattern('@'))`
    }
  );
});

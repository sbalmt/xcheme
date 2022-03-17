import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output an 'APPEND' pattern", () => {
  Assert.output(
    `
    skip append '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output an 'APPEND' pattern with an identity", () => {
  Assert.output(
    `
    skip append<100> '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(100, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output an 'APPEND' pattern with an auto identity", () => {
  Assert.output(
    `
    skip append<auto> '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(${Core.BaseSource.Output}, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output an 'APPEND NEXT' pattern", () => {
  Assert.output(
    `
    skip append next '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output an 'APPEND LEFT' pattern", () => {
  Assert.output(
    `
    skip append left '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output an 'APPEND RIGHT' pattern", () => {
  Assert.output(
    `
    skip append right '@';`,
    {
      '@SKIP0': `new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output an 'APPEND' pattern with multiple patterns", () => {
  Assert.output(
    `
    skip append ('@' | '*');`,
    {
      '@SKIP0': `new Core.AppendNodePattern(0, 1, 1, new Core.ChooseUnitPattern('@', '*'))`
    }
  );
});

test("Output an 'APPEND' pattern with chained patterns", () => {
  Assert.output(
    `
    skip append ('@' & '*' & '*' & opt '!');`,
    {
      '@SKIP0':
        `new Core.AppendNodePattern(0, 1, 1, ` +
        /**/ `new Core.ExpectUnitPattern('@'), ` +
        /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('!')` +
        /**/ `)` +
        `)`
    }
  );
});

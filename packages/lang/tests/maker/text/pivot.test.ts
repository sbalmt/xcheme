import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output a 'PIVOT' pattern", () => {
  Assert.output(
    `
    skip pivot '@';`,
    {
      '@SKIP0': `new Core.PivotNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PIVOT' pattern with an identity", () => {
  Assert.output(
    `
    skip pivot<100> '@';`,
    {
      '@SKIP0': `new Core.PivotNodePattern(100, 1, 0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PIVOT' pattern with an auto identity", () => {
  Assert.output(
    `
    skip pivot<auto> '@';`,
    {
      '@SKIP0': `new Core.PivotNodePattern(${Core.BaseSource.Output}, 1, 0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'PIVOT' pattern with multiple patterns", () => {
  Assert.output(
    `
    skip pivot ('@' | '*');`,
    {
      '@SKIP0': `new Core.PivotNodePattern(0, 1, 0, new Core.ChooseUnitPattern('@', '*'))`
    }
  );
});

test("Output a 'PIVOT' pattern with chained patterns", () => {
  Assert.output(
    `
    skip pivot ('@' & '*' & '*' & opt '!');`,
    {
      '@SKIP0':
        `new Core.PivotNodePattern(0, 1, 0, ` +
        /**/ `new Core.ExpectUnitPattern('@'), ` +
        /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
        /**/ `new Core.OptFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('!')` +
        /**/ `)` +
        `)`
    }
  );
});

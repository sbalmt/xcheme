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

import * as Assert from './utils/assert';

test("Output a 'SYMBOL' pattern", () => {
  Assert.output(
    `
    skip symbol '@';`,
    {
      '@SKIP0': `new Core.EmitSymbolPattern(0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'SYMBOL' pattern with chained patterns", () => {
  Assert.output(
    `
    skip symbol ('@' & '*' & '*');`,
    {
      '@SKIP0': `new Core.EmitSymbolPattern(0, new Core.ExpectUnitPattern('@'), new Core.ExpectUnitPattern('*', '*'))`
    }
  );
});

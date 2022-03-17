import * as Core from '@xcheme/core';

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

test("Output a 'SYMBOL' pattern with an identity", () => {
  Assert.output(
    `
    skip symbol<100> '@';`,
    {
      '@SKIP0': `new Core.EmitSymbolPattern(100, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'SYMBOL' pattern with an auto identity", () => {
  Assert.output(
    `
    skip symbol<auto> '@';`,
    {
      '@SKIP0': `new Core.EmitSymbolPattern(${Core.BaseSource.Output}, new Core.ExpectUnitPattern('@'))`
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

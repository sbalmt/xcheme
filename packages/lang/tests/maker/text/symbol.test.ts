import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test("Output a 'SYMBOL' pattern without a self identity", () => {
  Assert.output(
    `
    token <50> TOKEN as symbol '@';`,
    {
      TOKEN:
        `new Core.EmitTokenPattern(50, ` +
        /**/ `new Core.EmitSymbolPattern(50, new Core.ExpectUnitPattern('@'))` +
        `)`
    }
  );
});

test("Output a 'SYMBOL' pattern with an identity", () => {
  Assert.output(
    `
    skip symbol <50> '@';`,
    {
      '@SKIP0': `new Core.EmitSymbolPattern(50, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test("Output a 'SYMBOL' pattern with an auto identity", () => {
  Assert.output(
    `
    alias token <50> ALIAS as '@';
    skip symbol <auto> ALIAS;`,
    {
      '@SKIP0':
        `new Core.EmitSymbolPattern(${Core.BaseSource.Output}, ` +
        /**/ `new Core.UseValuePattern(50, new Core.ExpectUnitPattern('@'))` +
        `)`
    }
  );
});

test("Output a 'SYMBOL' pattern with chained patterns", () => {
  Assert.output(
    `
    skip symbol <50> ('@' & '*' & '*');`,
    {
      '@SKIP0':
        `new Core.EmitSymbolPattern(50, ` +
        /**/ `new Core.ExpectUnitPattern('@'), ` +
        /**/ `new Core.ExpectUnitPattern('*', '*')` +
        `)`
    }
  );
});

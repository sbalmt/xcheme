import * as Assert from './utils/assert';

test("Output a 'SKIP' pattern", () => {
  Assert.output(
    `
    skip '@';`,
    {
      '@SKIP0': `new Core.ExpectUnitPattern('@')`
    }
  );
});

test("Output a 'SKIP' pattern with an alias token reference", () => {
  Assert.output(
    `
    skip ALIAS;
    alias token ALIAS as '@';`,
    {
      '@SKIP0': `new Core.RunFlowPattern(() => L0_ALIAS)`,
      ALIAS: `new Core.ExpectUnitPattern('@')`
    }
  );
});

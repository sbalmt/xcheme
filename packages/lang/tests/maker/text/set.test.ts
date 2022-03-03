import * as Assert from './utils/assert';

test("Output a 'SET' pattern", () => {
  Assert.output(
    `
    skip set <1> '@';`,
    {
      '@SKIP0': `new Core.SetStatePattern(1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

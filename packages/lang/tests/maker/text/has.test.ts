import * as Assert from './utils/assert';

test("Output a 'HAS' pattern", () => {
  Assert.output(
    `
    skip has <0> '@';`,
    {
      '@SKIP0': `new Core.HasStatePattern(0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

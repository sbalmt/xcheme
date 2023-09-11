import * as Assert from './utils/assert';

test('Output an USE pattern', () => {
  Assert.output(
    `
    skip use <1> '@';`,
    {
      '@SKIP0': `new Core.UseValuePattern(1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

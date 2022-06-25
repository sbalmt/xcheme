import * as Assert from './utils/assert';

test('Output an ERROR pattern', () => {
  Assert.output(
    `
    skip error <1> '@';`,
    {
      '@SKIP0': `new Core.EmitErrorPattern(1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

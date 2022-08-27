import * as Assert from './utils/assert';

test('Output an WARN pattern', () => {
  Assert.output(
    `
    skip warn <1> '@';`,
    {
      '@SKIP0': `new Core.EmitLogPattern(1, 1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

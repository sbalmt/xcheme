import * as Assert from './utils/assert';

test('Output an UNCASE pattern', () => {
  Assert.output(
    `
    skip uncase 'A';`,
    {
      '@SKIP0': `new Core.UncaseTransformPattern(new Core.ExpectUnitPattern('A'))`
    }
  );
});

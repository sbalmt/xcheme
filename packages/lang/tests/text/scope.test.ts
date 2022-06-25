import * as Assert from './utils/assert';

test('Output a SCOPE pattern', () => {
  Assert.output(
    `
    skip scope '@';`,
    {
      '@SKIP0': `new Core.ScopeSymbolPattern(new Core.ExpectUnitPattern('@'))`
    }
  );
});

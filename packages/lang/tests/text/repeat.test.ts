import * as Assert from './utils/assert';

test('Output a REPEAT pattern', () => {
  Assert.output(
    `
    skip repeat '@';`,
    {
      '@SKIP0': `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('@'))`
    }
  );
});

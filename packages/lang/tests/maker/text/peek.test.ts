import * as Assert from './utils/assert';

test('Output a PEEK pattern', () => {
  Assert.output(
    `
    skip peek 'A';`,
    {
      '@SKIP0': `new Core.PeekFlowPattern(new Core.ExpectUnitPattern('A'))`
    }
  );
});

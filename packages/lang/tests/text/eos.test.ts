import * as Assert from './utils/assert';

test('Output an EOS pattern', () => {
  Assert.output(
    `
    skip 'x' & eos;`,
    {
      '@SKIP0': `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('x'), new Core.StopFlowPattern())`
    }
  );
});

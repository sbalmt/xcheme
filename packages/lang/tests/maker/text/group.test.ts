import * as Assert from './utils/assert';

test('Output a GROUP pattern', () => {
  Assert.output(
    `
    skip ('1' | '2') & 'x';`,
    {
      '@SKIP0': `new Core.ExpectFlowPattern(new Core.ChooseUnitPattern('1', '2'), new Core.ExpectUnitPattern('x'))`
    }
  );
});

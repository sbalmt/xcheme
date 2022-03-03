import * as Assert from './utils/assert';

test('Output a range pattern', () => {
  Assert.output(
    `
    skip from '0' to '9';`,
    {
      '@SKIP0': `new Core.RangeUnitPattern('0', '9')`
    }
  );
});

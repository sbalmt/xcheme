import * as Assert from './utils/assert';

test('Output a PLACE LEFT pattern', () => {
  Assert.output(
    `
    skip place left '@';`,
    {
      '@SKIP0': `new Core.PlaceNodePattern(0, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test('Output a PLACE RIGHT pattern', () => {
  Assert.output(
    `
    skip place right '@';`,
    {
      '@SKIP0': `new Core.PlaceNodePattern(1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test('Output a PLACE pattern (same as PLACE RIGHT)', () => {
  Assert.output(
    `
    skip place '@';`,
    {
      '@SKIP0': `new Core.PlaceNodePattern(1, new Core.ExpectUnitPattern('@'))`
    }
  );
});

test('Output a PLACE NEXT pattern', () => {
  Assert.output(
    `
    skip place next '@';`,
    {
      '@SKIP0': `new Core.PlaceNodePattern(2, new Core.ExpectUnitPattern('@'))`
    }
  );
});

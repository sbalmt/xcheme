import * as Assert from './utils/assert';

test("Output an 'AND' pattern", () => {
  Assert.output(
    `
    skip 'a' & 'bc';`,
    {
      '@SKIP0': `new Core.ExpectUnitPattern('a', 'b', 'c')`
    }
  );
});

test("Output a merged 'AND' pattern", () => {
  Assert.output(
    `
    skip 'a' & 'bc' & 'd';`,
    {
      '@SKIP0': `new Core.ExpectUnitPattern('a', 'b', 'c', 'd')`
    }
  );
});

test("Output a multi merged 'AND' pattern", () => {
  Assert.output(
    `
    skip 'a' & 'b' & repeat ('c' | 'd') & 'ef';`,
    {
      '@SKIP0':
        `new Core.ExpectFlowPattern(` +
        /**/ `new Core.ExpectUnitPattern('a', 'b'), ` +
        /**/ `new Core.RepeatFlowPattern(new Core.ChooseUnitPattern('c', 'd')), ` +
        /**/ `new Core.ExpectUnitPattern('e', 'f')` +
        `)`
    }
  );
});

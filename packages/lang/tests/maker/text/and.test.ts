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

test("Output an optimized 'AND' pattern", () => {
  Assert.output(
    `
    skip 'a' & 'bc' & 'd';`,
    {
      '@SKIP0': `new Core.ExpectUnitPattern('a', 'b', 'c', 'd')`
    }
  );
});

test("Output multiple optimized 'AND' patterns", () => {
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

test("Output an optimized 'AND' pattern in a 'NODE' directive", () => {
  Assert.output(
    `
    token <100> TOKEN_A as 'a';
    token <101> TOKEN_B as 'b';
    node  <200> NODE    as TOKEN_A & TOKEN_B & TOKEN_B & TOKEN_A & TOKEN_B;`,
    {
      NODE: `new Core.EmitNodePattern(200, 1, new Core.ExpectUnitPattern(100, 101, 101, 100, 101))`
    }
  );
});

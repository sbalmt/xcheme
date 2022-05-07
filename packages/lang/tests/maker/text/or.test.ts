import * as Assert from './utils/assert';

test('Output an OR pattern', () => {
  Assert.output(
    `
    skip '-' | '+' | '@';`,
    {
      '@SKIP0': `new Core.ChooseUnitPattern('-', '+', '@')`
    }
  );
});

test('Output an OR pattern optimized with a map', () => {
  Assert.output(
    `
    skip '-' | '+' | '123' | 'abc';`,
    {
      '@SKIP0':
        `new Core.MapFlowPattern(` +
        /**/ `new Core.UnitRoute('-'), ` +
        /**/ `new Core.UnitRoute('+'), ` +
        /**/ `new Core.UnitRoute('1', '2', '3'), ` +
        /**/ `new Core.UnitRoute('a', 'b', 'c')` +
        `)`
    }
  );
});

test("Output multiple 'OR' patterns optimized with a map", () => {
  Assert.output(
    `
    skip repeat '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';`,
    {
      '@SKIP0':
        `new Core.ChooseFlowPattern(` +
        /**/ `new Core.RepeatFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('-')` +
        /**/ `), ` +
        /**/ `new Core.ExpectUnitPattern('+'), ` +
        /**/ `new Core.ExpectFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('@'), ` +
        /******/ `new Core.ChooseUnitPattern('1', '2')` +
        /**/ `), ` +
        /**/ `new Core.ExpectUnitPattern('A'), ` +
        /**/ `new Core.ExpectUnitPattern('B')` +
        `)`
    }
  );
});

test("Output an optimized 'OR' pattern in a 'NODE' directive", () => {
  Assert.output(
    `
    token <100> TOKEN_A as 'a';
    token <101> TOKEN_B as 'b';
    node  <200> NODE    as TOKEN_A | TOKEN_B | TOKEN_B | TOKEN_A | TOKEN_B;`,
    {
      NODE:
        `new Core.EmitNodePattern(200, 1, ` +
        /**/ `new Core.MapFlowPattern(` +
        /******/ `new Core.UnitRoute(100), ` +
        /******/ `new Core.UnitRoute(101), ` +
        /******/ `new Core.UnitRoute(101), ` +
        /******/ `new Core.UnitRoute(100), ` +
        /******/ `new Core.UnitRoute(101)` +
        /**/ `)` +
        `)`
    }
  );
});

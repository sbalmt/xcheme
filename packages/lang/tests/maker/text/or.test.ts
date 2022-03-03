import * as Assert from './utils/assert';

test("Output an 'OR' pattern", () => {
  Assert.output(
    `
    skip '-' | '+' | '@';`,
    {
      '@SKIP0': `new Core.ChooseUnitPattern('-', '+', '@')`
    }
  );
});

test("Output an 'OR' pattern optimized with a map", () => {
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

test("Output an 'OR' pattern with a complex sequence", () => {
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

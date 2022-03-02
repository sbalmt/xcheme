import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output an 'OPT' pattern", () => {
  const input = "skip '.' & opt '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('.'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('@')` +
      /**/ `)` +
      `)`
  );
});

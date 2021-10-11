import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'PIVOT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip pivot '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PivotNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PIVOT' rule with multiple patterns", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip pivot ('@' | '*');");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PivotNodePattern(0, 1, 0, new Core.ChooseUnitPattern('@', '*'))`);
});

test("Output a 'PIVOT' rule with chained patterns", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip pivot ('@' & '*' & '*' & opt '!');");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
    `new Core.PivotNodePattern(0, 1, 0, ` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('!')` +
      /**/ `)` +
      `)`
  );
});

import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output an 'APPEND NEXT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append next '@';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND LEFT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append left '@';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND RIGHT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append right '@';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append '@';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND' rule with multiple patterns", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append ('@' | '*');");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ChooseUnitPattern('@', '*'))`);
});

test("Output an 'APPEND' rule with chained patterns", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append ('@' & '*' & '*' & opt '!');");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
    `new Core.AppendNodePattern(0, 1, 1, ` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('!')` +
      /**/ `)` +
      `)`
  );
});

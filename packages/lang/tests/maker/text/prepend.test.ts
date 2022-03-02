import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output a 'PREPEND NEXT' pattern", () => {
  const input = "skip prepend next '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.PrependNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PREPEND LEFT' pattern", () => {
  const input = "skip prepend left '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.PrependNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PREPEND RIGHT' pattern", () => {
  const input = "skip prepend right '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.PrependNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PREPEND' pattern", () => {
  const input = "skip prepend '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.PrependNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PREPEND' pattern with multiple patterns", () => {
  const input = "skip prepend ('@' | '*');";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.PrependNodePattern(0, 1, 1, new Core.ChooseUnitPattern('@', '*'))`);
});

test("Output a 'PREPEND' pattern with chained patterns", () => {
  const input = "skip prepend ('@' & '*' & '*' & opt '!');";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.PrependNodePattern(0, 1, 1, ` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('!')` +
      /**/ `)` +
      `)`
  );
});

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output an 'APPEND NEXT' pattern", () => {
  const input = "skip append next '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.AppendNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND LEFT' pattern", () => {
  const input = "skip append left '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.AppendNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND RIGHT' pattern", () => {
  const input = "skip append right '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND' pattern", () => {
  const input = "skip append '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND' pattern with multiple patterns", () => {
  const input = "skip append ('@' | '*');";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ChooseUnitPattern('@', '*'))`);
});

test("Output an 'APPEND' pattern with chained patterns", () => {
  const input = "skip append ('@' & '*' & '*' & opt '!');";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.AppendNodePattern(0, 1, 1, ` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('!')` +
      /**/ `)` +
      `)`
  );
});

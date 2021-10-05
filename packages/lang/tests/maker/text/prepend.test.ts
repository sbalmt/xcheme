import * as Core from '@xcheme/core';

import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'PREPEND NEXT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip prepend next '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PrependNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PREPEND LEFT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip prepend left '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PrependNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PREPEND RIGHT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip prepend right '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PrependNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PREPEND' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip prepend '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PrependNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PREPEND' rule with a map", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip prepend map { 'a', 'b', 'c' };");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
    `new Core.PrependNodePattern(${Core.BaseSource.Output}, 1, 1, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.UnitRoute('a'), ` +
      /******/ `new Core.UnitRoute('b'), ` +
      /******/ `new Core.UnitRoute('c')` +
      /**/ `)` +
      `)`
  );
});

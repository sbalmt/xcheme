import * as Core from '@xcheme/core';

import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output an 'APPEND NEXT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append next '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND LEFT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append left '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND RIGHT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append right '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Output an 'APPEND' rule with a map", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip append map { 'a', 'b', 'c'};");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
    `new Core.AppendNodePattern(${Core.BaseSource.Output}, 1, 1, ` +
      /**/ `new Core.MapFlowPattern(` +
      /******/ `new Core.UnitRoute('a'), ` +
      /******/ `new Core.UnitRoute('b'), ` +
      /******/ `new Core.UnitRoute('c')` +
      /**/ `)` +
      `)`
  );
});

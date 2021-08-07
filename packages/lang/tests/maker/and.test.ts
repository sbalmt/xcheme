import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse an 'AND' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip '-' & '+' & '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-+@-+@');
});

test("Output an 'AND' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip '-' & '+' & '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ExpectUnitPattern('-', '+', '@')`);
});

test("Parse subsequent 'AND' rules (optimized)", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip '-' & '+' & rep ('@' | 'A') & '1' & '2';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-+@A12-+@@AA12');
});

test("Output subsequent 'AND' rules (optimized)", () => {
  const project = Helper.makeParser(new TextCoder(), "skip '-' & '+' & rep ('@' | 'A') & '1' & '2';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('-', '+'), ` +
      /******/ `new Core.RepeatFlowPattern(new Core.ChooseUnitPattern('@', 'A'))` +
      /**/ `), ` +
      /**/ `new Core.ExpectUnitPattern('1', '2')` +
      `)`
  );
});

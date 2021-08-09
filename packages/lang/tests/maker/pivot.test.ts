import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'PIVOT' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip pivot '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Output a 'PIVOT' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip pivot '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.PivotNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`);
});

test("Parse a chained 'PIVOT' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip pivot ('@' & rep '*');");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@**');
});

test("Output a chained 'PIVOT' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip pivot ('@' & rep '*');");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.PivotNodePattern(0, 1, 0, ` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('*'))` +
      `)`
  );
});

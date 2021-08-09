import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'SYMBOL' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip symbol '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');
});

test("Output a 'SYMBOL' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip symbol '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe("new Core.EmitSymbolPattern(0, new Core.ExpectUnitPattern('@'))");
});

test("Parse a chained 'SYMBOL' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip symbol ('@' & rep '*');");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@**');
});

test("Output a chained 'SYMBOL' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip symbol ('@' & rep '*');");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.EmitSymbolPattern(0, ` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('*'))` +
      `)`
  );
});

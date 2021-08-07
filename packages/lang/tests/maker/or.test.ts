import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse an 'OR' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip '-' | '+' | '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-+@-+@');
});

test("Output an 'OR' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip '-' | '+' | '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ChooseUnitPattern('-', '+', '@')`);
});

test("Parse subsequent 'OR' rules (optimized)", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip rep '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '---+@1AB@2');
});

test("Output subsequent 'OR' rules (optimized)", () => {
  const project = Helper.makeParser(new TextCoder(), "skip rep '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ChooseFlowPattern(` +
      /**/ `new Core.ChooseFlowPattern(` +
      /******/ `new Core.ChooseFlowPattern(` +
      /**********/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('-')), ` +
      /**********/ `new Core.ChooseUnitPattern('+')` +
      /******/ `), ` +
      /******/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('@'), new Core.ChooseUnitPattern('1', '2'))` +
      /**/ `), ` +
      /**/ `new Core.ChooseUnitPattern('A', 'B')` +
      `)`
  );
});

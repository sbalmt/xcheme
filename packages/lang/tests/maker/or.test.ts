import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse subsequent 'OR' rules (simple)", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip '-' | '+' | '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-+@-+@');
});

test("Output subsequent 'OR' rules (simple)", () => {
  const project = Helper.makeParser(new TextCoder(), "skip '-' | '+' | '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ChooseUnitPattern('-', '+', '@')`);
});

test("Parse subsequent 'OR' rules (complex)", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip '-' | '+' | '123' | 'abc';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-123+abc');
});

test("Output subsequent 'OR' rules (complex)", () => {
  const project = Helper.makeParser(new TextCoder(), "skip '-' | '+' | '123' | 'abc';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ChooseFlowPattern(` +
      /**/ `new Core.ChooseUnitPattern('-', '+'), ` +
      /**/ `new Core.ExpectUnitPattern('1', '2', '3'), ` +
      /**/ `new Core.ExpectUnitPattern('a', 'b', 'c')` +
      `)`
  );
});

test("Parse subsequent 'OR' rules (optimized)", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip repeat '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '---+@1AB@2');
});

test("Output subsequent 'OR' rules (optimized)", () => {
  const project = Helper.makeParser(new TextCoder(), "skip repeat '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ChooseFlowPattern(` +
      /**/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('-')), ` +
      /**/ `new Core.ChooseUnitPattern('+'), ` +
      /**/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('@'), new Core.ChooseUnitPattern('1', '2')), ` +
      /**/ `new Core.ChooseUnitPattern('A', 'B')` +
      `)`
  );
});

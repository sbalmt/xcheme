import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'PREPEND' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip prepend '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Output a 'PREPEND' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip prepend '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();

  expect(rule.pattern).toBe(`new Core.PrependNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Parse a 'PREPEND NEXT' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip prepend next '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Output a 'PREPEND NEXT' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip prepend next '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.PrependNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`);
});

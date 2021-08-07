import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse an 'APPEND' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip append '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Output an 'APPEND' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip append '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 1, new Core.ExpectUnitPattern('@'))`);
});

test("Parse an 'APPEND NEXT' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip append next '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Output an 'APPEND NEXT' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip append next '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.AppendNodePattern(0, 1, 2, new Core.ExpectUnitPattern('@'))`);
});

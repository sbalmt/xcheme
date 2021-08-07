import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'PLACE' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip place '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Output a 'PLACE' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip place '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();

  expect(rule.pattern).toBe(`new Core.ScopeNodePattern(1, new Core.ExpectUnitPattern('@'))`);
});

test("Parse a 'PLACE NEXT' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip place next '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Output a 'PLACE NEXT' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip place next '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ScopeNodePattern(2, new Core.ExpectUnitPattern('@'))`);
});

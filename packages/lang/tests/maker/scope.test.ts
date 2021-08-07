import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'SCOPE' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip scope '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Output a 'SCOPE' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip scope '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();

  expect(rule.pattern).toBe(`new Core.ScopeSymbolPattern(new Core.ExpectUnitPattern('@'))`);
});

import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'REP' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip rep '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Output a 'REP' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip rep '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('@'))`);
});

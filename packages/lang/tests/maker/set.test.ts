import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'SET' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip set <1> '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');
});

test("Output a 'SET' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip set <1> '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.SetStatePattern(1, new Core.ExpectUnitPattern('@'))`);
});

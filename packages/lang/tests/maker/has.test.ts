import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'HAS' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip has <0> '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');
});

test("Output a 'HAS' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip has <0> '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.HasStatePattern(0, new Core.ExpectUnitPattern('@'))`);
});

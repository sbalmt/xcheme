import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'SKIP' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip '@';");
  const context = new Core.Context('test');

  // Test the output lexer.
  Helper.testLexer(project, context, '@@@');
});

test("Output a 'SKIP' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe("new Core.ExpectUnitPattern('@')");
});

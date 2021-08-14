import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse an 'ERROR' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip error <1> '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');

  // Check the error list.
  expect(context.errors).toHaveLength(1);

  const error = context.errors[0];
  expect(error).toBeDefined();
  expect(error.value).toBe(1);
});

test("Output an 'ERROR' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip error <1> '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.EmitErrorPattern(1, new Core.ExpectUnitPattern('@'))`);
});

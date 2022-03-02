import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse an 'ERROR' pattern", () => {
  const input = "skip error <1> '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');

  // Check the error list.
  expect(context.errors).toHaveLength(1);

  const error = context.errors[0];
  expect(error).toBeDefined();
  expect(error.value).toBe(1);
});

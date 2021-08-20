import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse an 'ERROR' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip error <1> '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');

  // Check the error list.
  expect(context.errors).toHaveLength(1);

  const error = context.errors[0];
  expect(error).toBeDefined();
  expect(error.value).toBe(1);
});

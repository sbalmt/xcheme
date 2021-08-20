import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse a 'HAS' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip has <0> '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');
});

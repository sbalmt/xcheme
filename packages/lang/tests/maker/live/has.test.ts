import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse a 'HAS' pattern", () => {
  const input = "skip has <0> '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');
});

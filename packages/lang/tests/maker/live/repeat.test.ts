import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse a 'REPEAT' pattern", () => {
  const input = "skip repeat '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

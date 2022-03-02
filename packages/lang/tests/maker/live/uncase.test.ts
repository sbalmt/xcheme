import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse an 'UNCASE' pattern", () => {
  const input = "skip uncase 'a';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'A');
});

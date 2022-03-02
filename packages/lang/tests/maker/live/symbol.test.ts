import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse a 'SYMBOL' pattern", () => {
  const input = "skip symbol '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');
});

test("Parse a 'SYMBOL' pattern with chained patterns", () => {
  const input = "skip symbol ('@' & '*' & '*');";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@**');
});

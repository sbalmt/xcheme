import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse an 'AND' pattern", () => {
  const input = "skip '-' & '+' & '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-+@-+@');
});

test("Parse an 'AND' pattern with an optimized sequence", () => {
  const input = "skip '-' & '+' & repeat ('@' | 'A') & '1' & '2';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-+@A12-+@@AA12');
});

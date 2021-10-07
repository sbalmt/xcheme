import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse an 'AND' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip '-' & '+' & '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-+@-+@');
});

test("Parse an 'AND' rule with an optimized sequence", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip '-' & '+' & repeat ('@' | 'A') & '1' & '2';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-+@A12-+@@AA12');
});

import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse a 'SYMBOL' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip symbol '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@');
});

test("Parse a 'SYMBOL' rule with chained patterns", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip symbol ('@' & '*' & '*');");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@**');
});

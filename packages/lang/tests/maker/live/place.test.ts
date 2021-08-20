import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse a 'PLACE' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip place '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse a 'PLACE NEXT' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip place next '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

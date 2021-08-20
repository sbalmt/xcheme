import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse an 'APPEND' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip append '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse an 'APPEND NEXT' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip append next '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse a 'PIVOT' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip pivot '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse a chained 'PIVOT' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip pivot ('@' & repeat '*');");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@**');
});

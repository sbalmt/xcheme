import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse a 'PIVOT' pattern", () => {
  const input = "skip pivot '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@@@');
});

test("Parse a 'PIVOT' pattern with multiple patterns", () => {
  const input = "skip pivot ('@' | '*');";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@*');
});

test("Parse a 'PIVOT' pattern with chained patterns", () => {
  const input = "skip pivot ('@' & '*' & '*' & opt '!');";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '@**!');
});

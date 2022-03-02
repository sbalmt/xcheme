import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse an 'OR' pattern", () => {
  const input = "skip '-' | '+' | '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-+@-+@');
});

test("Parse an 'OR' pattern optimized with a map", () => {
  const input = "skip '-' | '+' | '123' | 'abc';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '-123+abc');
});

test("Parse an 'OR' pattern with a complex sequence", () => {
  const input = "skip repeat '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '---+@1AB@2');
});

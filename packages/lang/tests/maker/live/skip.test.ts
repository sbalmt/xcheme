import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse a 'SKIP' pattern", () => {
  const input = "skip '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Test the output lexer.
  Helper.testLexer(project, context, '@@@');
});

test("Parse a 'SKIP' pattern with an alias token reference", () => {
  const input = "skip ALIAS; alias token ALIAS as '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  // Test the output lexer.
  Helper.testLexer(project, context, '@@@');
});

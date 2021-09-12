import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse a 'SKIP' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip '@';");
  const context = new Core.Context('test');

  // Test the output lexer.
  Helper.testLexer(project, context, '@@@');
});

test("Parse a 'SKIP' rule with an alias token reference", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip ALIAS; alias token ALIAS as '@';");
  const context = new Core.Context('test');

  // Test the output lexer.
  Helper.testLexer(project, context, '@@@');
});

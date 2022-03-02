import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse an 'ACCESS' pattern with a token map", () => {
  const input = "token TOKEN as map { <100> A as 'a' }; node NODE as TOKEN.A;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'aaaa');
});

test("Parse an 'ACCESS' pattern with a nested token map", () => {
  const input = "token TOKEN as map { <100> A as 'a' & map { <200> B as 'b', C as 'c' } }; node NODE as TOKEN.A.B;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abac');
});

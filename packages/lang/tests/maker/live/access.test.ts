import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse a token 'ACCESS' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "token TOKEN as map { <100> A as 'a' }; node NODE as TOKEN.A;");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'aaaa');
});

test("Parse a nested token 'ACCESS' rule", () => {
  const project = Helper.makeParser(
    new Lang.LiveCoder(),
    "token TOKEN as map { <100> A as 'a' & map { <200> B as 'b', C as 'c' } }; node NODE as TOKEN.A.B;"
  );
  const context = new Core.Context('test');

  Helper.testLexer(project, context, 'abac');
});

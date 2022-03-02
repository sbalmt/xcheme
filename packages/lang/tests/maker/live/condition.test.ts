import * as Core from '@xcheme/core';

import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Parse a 'THEN' pattern", () => {
  const input = "skip '\\\\' then *;";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '\\x\\y\\z');
});

test("Parse a 'THEN/ELSE' pattern", () => {
  const input = "skip '\\\\' then * else '@';";
  const project = Helper.makeParser(new Lang.LiveCoder(), input);
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '\\x\\y@@');
});

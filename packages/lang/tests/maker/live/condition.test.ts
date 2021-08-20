import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test('Parse a half condition rule', () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip '\\\\' then *;");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '\\x\\y\\z');
});

test('Parse a full condition rule', () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip '\\\\' then * else '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '\\x\\y@@');
});

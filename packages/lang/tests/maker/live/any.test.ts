import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Parse an 'ANY' rule", () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), 'skip *;');
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '.a0@');
});
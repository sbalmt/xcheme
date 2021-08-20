import * as Core from '@xcheme/core';
import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test('Parse a range rule', () => {
  const project = Helper.makeParser(new Lang.LiveCoder(), "skip from '0' to '9';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '0123456789');
});

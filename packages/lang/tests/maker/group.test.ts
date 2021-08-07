import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test('Parse a group rule', () => {
  const project = Helper.makeParser(new LiveCoder(), "skip ('1' | '2') & 'x';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '1x2x');
});

test('Output a group rule', () => {
  const project = Helper.makeParser(new TextCoder(), "skip ('1' | '2') & 'x';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ExpectFlowPattern(new Core.ChooseUnitPattern('1', '2'), new Core.ExpectUnitPattern('x'))`);
});

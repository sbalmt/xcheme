import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse a 'NOT'  rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip not '@' then * else '@!';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '.a0@!');
});

test("Output a 'NOT' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip not '@' then * else '@!';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ConditionFlowPattern(` +
      /**/ `new Core.NegateFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('@')` +
      /**/ `), ` +
      /**/ `new Core.AnyUnitPattern(), ` +
      /**/ `new Core.ExpectUnitPattern('@', '!')` +
      `)`
  );
});

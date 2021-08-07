import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test('Parse a half condition rule', () => {
  const project = Helper.makeParser(new LiveCoder(), "skip '\\\\' then *;");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '\\x\\y\\z');
});

test('Output a half condition rule', () => {
  const project = Helper.makeParser(new TextCoder(), "skip '\\\\' then *;");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ConditionFlowPattern(new Core.ExpectUnitPattern('\\\\'), new Core.AnyUnitPattern())`);
});

test('Parse a full condition rule', () => {
  const project = Helper.makeParser(new LiveCoder(), "skip '\\\\' then * else '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '\\x\\y@@');
});

test('Output a full condition rule', () => {
  const project = Helper.makeParser(new TextCoder(), "skip '\\\\' then * else '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ConditionFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('\\\\'), ` +
      /**/ `new Core.AnyUnitPattern(), ` +
      /**/ `new Core.ExpectUnitPattern('@')` +
      `)`
  );
});

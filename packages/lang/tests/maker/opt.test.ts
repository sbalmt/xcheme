import * as Core from '@xcheme/core';
import * as Helper from './common/helper';

import { LiveCoder, TextCoder } from '../../src/index';

test("Parse an 'OPT' rule", () => {
  const project = Helper.makeParser(new LiveCoder(), "skip '.' & opt '@';");
  const context = new Core.Context('test');

  Helper.testLexer(project, context, '..@');
});

test("Output an 'OPT' rule", () => {
  const project = Helper.makeParser(new TextCoder(), "skip '.' & opt '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('.'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('@')` +
      /**/ `)` +
      `)`
  );
});

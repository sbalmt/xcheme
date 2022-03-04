import * as Core from '@xcheme/core';

import * as Lang from '../../../../src/index';
import * as Helper from '../../helper';

/**
 * Assert result.
 */
export type Result = {
  /**
   * Project context.
   */
  project: Lang.Project.Context;
  /**
   * Parser context.
   */
  context: Core.Context;
};

/**
 * Assert the specified source text can be lexically-parsed by the specified source code.
 * @param text Source text.
 * @param code Source code.
 * @returns Returns the assert result.
 */
export const lexer = (text: string, code: string): Result => {
  const project = Helper.makeParser(new Lang.LiveCoder(), code);
  const context = new Core.Context('test-lexer');
  Helper.testLexer(project, context, text);
  return { project, context };
};

/**
 * Assert the specified source text can be fully-parsed by the specified source code.
 * @param text Source text.
 * @param code Source code.
 * @returns Returns the assert result.
 */
export const parser = (text: string, code: string): Result => {
  const project = Helper.makeParser(new Lang.LiveCoder(), code);
  const context = new Core.Context('test-parser');
  Helper.testLexer(project, context, text);
  Helper.testParser(project, context, context.tokens);
  return { project, context };
};

/**
 * Assert the specified context has the total number of tokens with the given identities.
 * @param context Source context.
 * @param identities Array of identifies.
 * @param total Expected number of tokens.
 */
export const tokens = (context: Core.Context, identities: number[], total: number): void => {
  let count = 0;
  for (const token of context.tokens) {
    expect(identities).toContain(token.value);
    count++;
  }
  expect(count).toBe(total);
};

/**
 * Assert the specified context has the total number of nodes with the given identities.
 * @param context Source context.
 * @param identities Array of identifies.
 * @param total Expected number of nodes.
 */
export const nodes = (context: Core.Context, identities: number[], total: number): void => {
  let node = context.node;
  let count = 0;
  while ((node = node.next!)) {
    expect(identities).toContain(node.value);
    count++;
  }
  expect(count).toBe(total);
};

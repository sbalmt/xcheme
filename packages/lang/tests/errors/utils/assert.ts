import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';
import * as Parser from '@xcheme/parser';

import * as Lang from '../../../src/index';
import * as Helper from '../../helper';

/**
 * Error details.
 */
export type Error = {
  /**
   * Error code.
   */
  code: Lang.Errors;
  /**
   * Error column range.
   */
  column?: [number, number];
  /**
   * Error line range.
   */
  line?: [number, number];
};

/**
 * Assert the specified source code can produce the expected errors.
 * @param code Source code.
 * @param errors Error list.
 */
export const error = (code: string, errors: Error[]): void => {
  const coder = new Lang.LiveCoder();
  const project = new Lang.Project.Context('make', coder, { loadFileHook: Helper.loadFileHook });
  const context = new Core.Context<Lang.Types.Metadata>('make');

  // Consume input text, tokens and optimize the generated AST.
  expect(Lexer.consumeText(code, context)).toBeTruthy();
  expect(Parser.consumeTokens(context.tokens, context)).toBeTruthy();
  expect(Lang.Optimizer.consumeNodes(project, context.node)).toBeFalsy();

  // Assert all errors.
  expect(project.errors).toHaveLength(errors.length);

  for (let index = 0; index < errors.length; ++index) {
    const source = project.errors.at(index)!;
    const target = errors[index];
    expect(source.value).toBe(target.code);
    if (target.line) {
      const line = source.fragment.location.line;
      expect(line.begin).toBe(target.line[0]);
      expect(line.end).toBe(target.line[1]);
    }
    if (target.column) {
      const column = source.fragment.location.column;
      expect(column.begin).toBe(target.column[0]);
      expect(column.end).toBe(target.column[1]);
    }
  }
};

import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

/**
 * All parser errors.
 */
export const enum Errors {
  DUPLICATE_IDENTIFIER = Core.Errors.DUPLICATE_IDENTIFIER,
  UNEXPECTED_TOKEN = Lexer.Errors.UNEXPECTED_TOKEN,
  UNEXPECTED_SYNTAX
}

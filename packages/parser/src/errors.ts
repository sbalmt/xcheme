import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

/**
 * Internal errors.
 */
export const enum InternalErrors {
  DUPLICATE_IDENTIFIER = Core.InternalErrors.DUPLICATE_IDENTIFIER,
  UNEXPECTED_TOKEN = Lexer.InternalErrors.UNEXPECTED_TOKEN,
  UNEXPECTED_SYNTAX
}

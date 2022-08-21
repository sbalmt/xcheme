import * as Core from '@xcheme/core';

/**
 * All lexer errors.
 */
export const enum Errors {
  DUPLICATE_IDENTIFIER = Core.InternalErrors.DUPLICATE_IDENTIFIER,
  UNEXPECTED_TOKEN
}

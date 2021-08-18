import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Console from './console';

/**
 * All supported errors.
 */
const errorMessages = {
  [Lang.Errors.DUPLICATE_IDENTIFIER]: "Duplicate identifier '{0}' at line {1}, column {2}.",
  [Lang.Errors.UNEXPECTED_TOKEN]: "Unexpected token '{0}' at line {1}, column {2}.",
  [Lang.Errors.UNEXPECTED_SYNTAX]: "Unexpected syntax '{0}' at line {1}, column {2}.",
  [Lang.Errors.UNEXPECTED_NODE]: "Unexpected node '{0}' at line {1}, column {2}.",
  [Lang.Errors.INVALID_NODE_REFERENCE]: "Tokens cannot have node references, '{0}' at line {1}, column {2}.",
  [Lang.Errors.INVALID_TOKEN_REFERENCE]: "Nodes cannot reference aliased tokens, '{0}' at line {1}, column {2}.",
  [Lang.Errors.UNRESOLVED_TOKEN_REFERENCE]: "Token reference is not resolved yet, '{0}' at line {1}, column {2}.",
  [Lang.Errors.UNDEFINED_IDENTIFIER]: "Undefined identifiers cannot be referenced, '{0}' at line {1}, column {2}."
};

/**
 * Get the corresponding error message based on the given error object.
 * @param error Input error.
 * @returns Returns the corresponding error message.
 * @throws Throws an error when the specified error isn't supported.
 */
export const getMessage = (error: Core.Error): string => {
  const template = errorMessages[error.value as Lang.Errors];
  if (!template) {
    throw `Error value ${error.value} is not supported.`;
  }
  const fragment = error.fragment;
  const location = fragment.location;
  return template.replace(/(\{[0-2]\})/g, (match: string) => {
    switch (match) {
      case '{0}':
        return fragment.data.replace(/\n/g, '\\n');
      case '{1}':
        return (location.line + 1).toString();
      case '{2}':
        return (location.column + 1).toString();
    }
    return match;
  });
};

/**
 * Print all the given errors.
 * @param errors Error list.
 */
export const print = (errors: Core.Error[]): void => {
  Console.printLine('Errors:');
  for (const error of errors) {
    Console.printLine(`  ${getMessage(error)}`);
  }
  Console.printLine('');
};

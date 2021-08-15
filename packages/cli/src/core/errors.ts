import { Error } from '@xcheme/core';
import { Errors } from '@xcheme/lang';

import * as Console from './console';

/**
 * All supported errors.
 */
const errorMessages = {
  [Errors.DUPLICATE_IDENTIFIER]: "Duplicate identifier '{0}' at line {1}, column {2}.",
  [Errors.UNEXPECTED_TOKEN]: "Unexpected token '{0}' at line {1}, column {2}.",
  [Errors.UNEXPECTED_SYNTAX]: "Unexpected syntax '{0}' at line {1}, column {2}.",
  [Errors.UNEXPECTED_NODE]: "Unexpected node '{0}' at line {1}, column {2}.",
  [Errors.INVALID_NODE_REFERENCE]: "Invalid node reference '{0}' at line {1}, column {2}.",
  [Errors.INVALID_TOKEN_REFERENCE]: "Invalid token reference '{0}' at line {1}, column {2}.",
  [Errors.UNRESOLVED_TOKEN_REFERENCE]: "Unresolved token reference '{0}' at line {1}, column {2}.",
  [Errors.UNDEFINED_IDENTIFIER]: "Undefined identifier '{0}' at line {1}, column {2}."
};

/**
 * Get the corresponding error message based on the given input error.
 * @param error Input error.
 * @returns Returns the corresponding error message.
 */
export const getMessage = (error: Error): string => {
  const template = errorMessages[error.value as Errors];
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
export const print = (errors: Error[]): void => {
  Console.printLine('Errors:');
  for (const error of errors) {
    Console.printLine(`  ${getMessage(error)}`);
  }
  Console.printLine('');
};

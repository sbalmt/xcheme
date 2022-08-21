import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Console from './console';

/**
 * All supported errors.
 */
const errorMessages = {
  [Lang.Errors.DUPLICATE_IDENTIFIER]: 'Duplicate identifier "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNEXPECTED_TOKEN]: 'Unexpected token "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNEXPECTED_SYNTAX]: 'Unexpected syntax "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNEXPECTED_ARGUMENT]: 'Unexpected argument "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT]: 'Unexpected extra argument "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNSUPPORTED_IDENTITY]: 'Unsupported identity "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNSUPPORTED_ARGUMENT]: 'Unsupported argument "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNDEFINED_IDENTIFIER]: 'Undefined identifiers cannot be referenced, "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNDEFINED_IDENTITY]: 'Undefined identity, "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNRESOLVED_IDENTIFIER]: 'Unresolved identifiers cannot be referenced, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_TOKEN_REFERENCE]: 'Token reference cannot be here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_NODE_REFERENCE]: 'Node reference cannot be here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE]: 'Alias Token reference cannot be here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]: 'Alias Node reference cannot be here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_MAP_REFERENCE]: 'Map cannot be referenced here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]: 'Map entries cannot be referenced here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_MAP_ENTRY]: 'Map entries must start with a token or string, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_AUTO_IDENTITY]: 'Invalid auto identity at line {1}, column {2}.',
  [Lang.Errors.ARGUMENTS_MISSING]: 'Arguments missing at line {1}, column {2}.',
  [Lang.Errors.TOKEN_COLLISION]: 'Multiple tokens with the same expression, "{0}" at line {1}, column {2}.',
  [Lang.Errors.IMPORT_DISABLED]: 'Import feature disabled, {0} at line {1}, column {2}.',
  [Lang.Errors.IMPORT_NOT_FOUND]: "File doesn't found, {0} at line {1}, column {2}.",
  [Lang.Errors.IMPORT_FAILURE]: 'Failed to compile, {0} at line {1}, column {2}.',
  [Lang.Errors.IMPORT_CYCLIC]: 'Cyclic import error , {0} at line {1}, column {2}.'
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
  return template.replace(/(\{[0-2]\})/g, (match: string): string => {
    switch (match) {
      case '{0}':
        return fragment.data.replace(/\n/g, '\\n');
      case '{1}':
        return (location.line.begin + 1).toString();
      case '{2}':
        return (location.column.begin + 1).toString();
    }
    return match;
  });
};

/**
 * Print all the given errors.
 * @param errors List of errors.
 */
export const print = (errors: Core.ErrorList): void => {
  Console.printLine('Errors:');
  for (const error of errors) {
    Console.printLine(`  ${error.fragment.location.name}: ${getMessage(error)}`);
  }
  Console.printLine('');
};

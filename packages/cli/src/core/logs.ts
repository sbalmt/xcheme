import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import { Logging } from './console';

/**
 * All supported log types.
 */
const logTypes = {
  [Core.LogType.ERROR]: 'ERROR',
  [Core.LogType.WARNING]: 'WARN ',
  [Core.LogType.INFORMATION]: 'INFO '
};

/**
 * All supported log messages.
 */
const logMessages = {
  [Lang.Errors.DUPLICATE_IDENTIFIER]: 'Duplicate identifier "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNEXPECTED_TOKEN]: 'Unexpected token "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNEXPECTED_SYNTAX]: 'Unexpected syntax "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNEXPECTED_ARGUMENT]: 'Unexpected argument "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT]: 'Unexpected extra argument "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNSUPPORTED_IDENTITY]: 'Unsupported identity "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNSUPPORTED_ARGUMENT]: 'Unsupported argument "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNDEFINED_IDENTIFIER]: 'Undefined identifiers cannot be referenced, "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNDEFINED_IDENTITY]: 'Undefined identity, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_SKIP_MAP_ENTRY]: 'Skip map entries must start with tokens, "{0}" at line {1}, column {2}.',
  [Lang.Errors.UNRESOLVED_IDENTIFIER]: 'Unresolved identifiers cannot be referenced, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_TOKEN_REFERENCE]: 'Token reference cannot be here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_TOKEN_MAP_ENTRY]: 'Token map entries must start with strings, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_NODE_REFERENCE]: 'Node reference cannot be here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_NODE_MAP_ENTRY]: 'Node map entries must start with tokens, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE]: 'Alias Token reference cannot be here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]: 'Alias Node reference cannot be here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_MAP_REFERENCE]: 'Map cannot be referenced here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]: 'Map entries cannot be referenced here, "{0}" at line {1}, column {2}.',
  [Lang.Errors.INVALID_AUTO_IDENTITY]: 'Invalid auto identity at line {1}, column {2}.',
  [Lang.Errors.ARGUMENTS_MISSING]: 'Arguments missing at line {1}, column {2}.',
  [Lang.Errors.TOKEN_COLLISION]: 'Multiple tokens with the same expression, "{0}" at line {1}, column {2}.',
  [Lang.Errors.IMPORT_DISABLED]: 'Import feature disabled, {0} at line {1}, column {2}.',
  [Lang.Errors.IMPORT_NOT_FOUND]: "File doesn't found, {0} at line {1}, column {2}.",
  [Lang.Errors.IMPORT_FAILURE]: 'Failed to compile, {0} at line {1}, column {2}.',
  [Lang.Errors.IMPORT_CYCLIC]: 'Cyclic import error , {0} at line {1}, column {2}.'
};

/**
 * Get the corresponding log message from on the given log record.
 * @param log Log record.
 * @param custom Determines whether or not there are custom errors in the given logs list.
 * @returns Returns the corresponding log message.
 * @throws Throws an error when the specified log value isn't supported.
 */
export const getMessage = (log: Core.LogRecord, custom: boolean): string => {
  const message = logMessages[log.value as Lang.Errors];
  if (!message) {
    if (!custom) {
      throw `Log message (code: ${log.value}) doesn't found.`;
    }
    return `Custom (${log.value})`;
  }
  const fragment = log.fragment;
  const location = fragment.location;
  return message.replace(/(\{[0-2]\})/g, (match: string): string => {
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
 * Print all logs in the specified log list.
 * @param logs Log list.
 * @param custom Determines whether or not there are custom errors in the given logs list.
 */
export const printList = (logs: Core.LogList, custom: boolean = false): void => {
  if (logs.length > 0) {
    Logging.printLine('');
    for (const log of logs) {
      const type = logTypes[log.type];
      const location = log.fragment.location.name;
      const message = getMessage(log, custom);
      Logging.printLine(`  ${type} [${location}]: ${message}`);
    }
    Logging.printLine('');
  }
};

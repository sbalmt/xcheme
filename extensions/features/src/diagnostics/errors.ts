import * as VSCode from 'vscode';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Utils from '../utils';

/**
 * All error messages.
 */
const errorMessages = {
  [Lang.Errors.DUPLICATE_IDENTIFIER]: 'Duplicate identifier.',
  [Lang.Errors.UNEXPECTED_TOKEN]: 'Unexpected token.',
  [Lang.Errors.UNEXPECTED_SYNTAX]: 'Unexpected syntax.',
  [Lang.Errors.UNEXPECTED_ARGUMENT]: 'Unexpected argument.',
  [Lang.Errors.UNEXPECTED_EXTRA_ARGUMENT]: 'Unexpected extra argument.',
  [Lang.Errors.UNSUPPORTED_IDENTITY]: 'Unsupported identity.',
  [Lang.Errors.UNSUPPORTED_ARGUMENT]: 'Unsupported argument.',
  [Lang.Errors.UNDEFINED_IDENTIFIER]: 'Undefined identifiers cannot be referenced.',
  [Lang.Errors.UNDEFINED_IDENTITY]: 'Undefined identity.',
  [Lang.Errors.UNRESOLVED_IDENTIFIER]: 'Unresolved identifiers cannot be referenced.',
  [Lang.Errors.INVALID_SKIP_MAP_ENTRY]: 'Skip map entries must start with strings.',
  [Lang.Errors.INVALID_TOKEN_REFERENCE]: 'Token references cannot be here.',
  [Lang.Errors.INVALID_TOKEN_MAP_ENTRY]: 'Token map entries must start with strings.',
  [Lang.Errors.INVALID_NODE_REFERENCE]: 'Node references cannot be here.',
  [Lang.Errors.INVALID_NODE_MAP_ENTRY]: 'Node map entries must start with tokens.',
  [Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE]: 'References for an alias token cannot be here.',
  [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]: 'References for an alias node cannot be here.',
  [Lang.Errors.INVALID_MAP_REFERENCE]: 'Map cannot be referenced here.',
  [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]: 'Map entries cannot be referenced here.',
  [Lang.Errors.INVALID_AUTO_IDENTITY]: 'Invalid auto identity.',
  [Lang.Errors.ARGUMENTS_MISSING]: 'Arguments missing.',
  [Lang.Errors.TOKEN_COLLISION]: 'Multiple tokens with the same expression.',
  [Lang.Errors.IMPORT_DISABLED]: 'Import feature disabled.',
  [Lang.Errors.IMPORT_NOT_FOUND]: "File doesn't found.",
  [Lang.Errors.IMPORT_FAILURE]: 'Failed to compile.',
  [Lang.Errors.IMPORT_CYCLIC]: 'Cyclic import error.'
};

/**
 * Get the corresponding error message from the given log record.
 * @param log Log record.
 * @returns Returns the corresponding error message.
 * @throws Throws an exception when the specified error isn't supported.
 */
const getMessage = (log: Core.LogRecord): string => {
  const message = errorMessages[log.value as Lang.Errors];

  if (!message) {
    throw new Error(`Error value '${log.value}' isn't supported.`);
  }

  return message;
};

/**
 * Get a new diagnostics list containing only errors from the given log list.
 * @param path Log path.
 * @param logs Log list.
 * @returns Returns the diagnostics list.
 */
export const getDiagnostics = (path: string, logs: Core.LogList): VSCode.Diagnostic[] => {
  const list = [];

  for (const log of logs) {
    if (log.type !== Core.LogType.ERROR) {
      continue;
    }

    const location = log.fragment.location;

    if (location.name !== path) {
      continue;
    }

    const range = Utils.getRange(location);
    const severity = VSCode.DiagnosticSeverity.Error;
    const diagnostic = new VSCode.Diagnostic(range, getMessage(log), severity);

    list.push(diagnostic);
  }

  return list;
};

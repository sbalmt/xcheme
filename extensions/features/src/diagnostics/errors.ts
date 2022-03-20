import * as VSCode from 'vscode';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

/**
 * All error messages.
 */
const errorMessages = {
  [Lang.Errors.DUPLICATE_IDENTIFIER]: 'Duplicate identifier.',
  [Lang.Errors.UNEXPECTED_TOKEN]: 'Unexpected token.',
  [Lang.Errors.UNEXPECTED_SYNTAX]: 'Unexpected syntax.',
  [Lang.Errors.UNEXPECTED_NODE]: 'Unexpected node.',
  [Lang.Errors.UNSUPPORTED_NODE]: 'Unsupported node.',
  [Lang.Errors.UNSUPPORTED_IDENTITY]: 'Unsupported identity.',
  [Lang.Errors.UNDEFINED_IDENTIFIER]: 'Undefined identifiers cannot be referenced.',
  [Lang.Errors.UNDEFINED_IDENTITY]: 'Undefined identity.',
  [Lang.Errors.UNDEFINED_AUTO_IDENTITY]: 'Undefined auto identity.',
  [Lang.Errors.UNRESOLVED_IDENTIFIER]: 'Unresolved identifiers cannot be referenced.',
  [Lang.Errors.UNRESOLVED_TOKEN_REFERENCE]: 'Token reference is not resolved yet.',
  [Lang.Errors.UNRESOLVED_NODE_REFERENCE]: 'Node reference is not resolved yet.',
  [Lang.Errors.UNRESOLVED_ALIAS_TOKEN_REFERENCE]: 'Alias Token reference is not resolved yet.',
  [Lang.Errors.UNRESOLVED_ALIAS_NODE_REFERENCE]: 'Alias Node reference is not resolved yet.',
  [Lang.Errors.INVALID_TOKEN_REFERENCE]: 'Token references cannot be in use here.',
  [Lang.Errors.INVALID_NODE_REFERENCE]: 'Node references cannot be in use here.',
  [Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE]: 'References for an alias token cannot be in use here.',
  [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]: 'References for an alias node cannot be in use here.',
  [Lang.Errors.INVALID_MAP_REFERENCE]: 'Map cannot be referenced here.',
  [Lang.Errors.INVALID_MAP_ENTRY_REFERENCE]: 'Map entries cannot be referenced here.',
  [Lang.Errors.INVALID_MAP_ENTRY]: 'Map entries must start with a token or string.',
  [Lang.Errors.TOKEN_COLLISION]: 'Multiple tokens with the same expression.',
  [Lang.Errors.IMPORT_DISABLED]: 'Import feature disabled.',
  [Lang.Errors.IMPORT_NOT_FOUND]: "File doesn't found.",
  [Lang.Errors.IMPORT_FAILURE]: 'Failed to compile.',
  [Lang.Errors.IMPORT_CYCLIC]: 'Cyclic import error.'
};

/**
 * Get the corresponding error message based on the given error object.
 * @param error Error object.
 * @returns Returns the corresponding error message.
 * @throws Throws an exception when the specified error isn't supported.
 */
const getMessage = (error: Core.Error): string => {
  const message = errorMessages[error.value as Core.Errors];
  if (!message) {
    throw new Error(`Error value ${error.value} is not supported.`);
  }
  return message;
};

/**
 * Get a new diagnostics list based on the specified errors list.
 * @param error Errors list.
 * @returns Returns the diagnostics list.
 */
export const getDiagnostics = (errors: Core.Error[]): VSCode.Diagnostic[] => {
  const list = [];
  for (const error of errors) {
    const location = error.fragment.location;
    const severity = VSCode.DiagnosticSeverity.Error;
    const range = new VSCode.Range(
      new VSCode.Position(location.line.begin, location.column.begin),
      new VSCode.Position(location.line.end, location.column.end)
    );
    list.push(new VSCode.Diagnostic(range, getMessage(error), severity));
  }
  return list;
};

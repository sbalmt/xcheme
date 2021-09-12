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
  [Lang.Errors.UNOPTIMIZED_NODE]: 'Unoptimized node.',
  [Lang.Errors.UNDEFINED_IDENTIFIER]: 'Undefined identifiers cannot be referenced.',
  [Lang.Errors.UNRESOLVED_IDENTIFIER]: 'Unresolved identifiers cannot be referenced.',
  [Lang.Errors.INVALID_NODE_REFERENCE]: 'Node references cannot be in use here.',
  [Lang.Errors.INVALID_TOKEN_REFERENCE]: 'Token references cannot be in use here.',
  [Lang.Errors.INVALID_ALIAS_NODE_REFERENCE]: 'References for an alias node cannot be in use here.',
  [Lang.Errors.INVALID_ALIAS_TOKEN_REFERENCE]: 'References for an alias token cannot be in use here.',
  [Lang.Errors.UNRESOLVED_TOKEN_REFERENCE]: 'Token reference is not resolved yet.',
  [Lang.Errors.TOKEN_COLLISION]: 'Multiple tokens with the same expression.'
};

/**
 * Get the corresponding error message based on the given error object.
 * @param error Input error.
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
 * Get a new diagnostics list based on the specified errors.
 * @param error Inputs errors.
 * @returns Returns the diagnostics list.
 */
export const getDiagnostics = (errors: Core.Error[]): VSCode.Diagnostic[] => {
  const list = [];
  for (const error of errors) {
    const location = error.fragment.location;
    const severity = VSCode.DiagnosticSeverity.Error;
    const range = new VSCode.Range(
      new VSCode.Position(location.line, location.column),
      new VSCode.Position(location.line, location.column)
    );
    list.push(new VSCode.Diagnostic(range, getMessage(error), severity));
  }
  return list;
};

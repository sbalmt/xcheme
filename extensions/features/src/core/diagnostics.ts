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
  [Lang.Errors.INVALID_NODE_REFERENCE]: 'Tokens cannot have node references.',
  [Lang.Errors.INVALID_TOKEN_REFERENCE]: 'Nodes cannot reference aliased tokens.',
  [Lang.Errors.UNRESOLVED_TOKEN_REFERENCE]: 'Token reference is not resolved yet.',
  [Lang.Errors.UNDEFINED_IDENTIFIER]: 'Undefined identifiers cannot be referenced.'
};

/**
 * Get the corresponding error message based on the given error object.
 * @param error Input error.
 * @returns Returns the corresponding error message.
 * @throws Throws an error when the specified error isn't supported.
 */
const getMessage = (error: Core.Error): string => {
  const message = errorMessages[error.value as Core.Errors];
  if (!message) {
    throw `Error value ${error.value} is not supported.`;
  }
  return message;
};

/**
 * Push the specified error into the given diagnostics list.
 * @param list Diagnostics list.
 * @param error Input error.
 */
const pushMessage = (list: VSCode.Diagnostic[], error: Core.Error): void => {
  const location = error.fragment.location;
  const start = new VSCode.Position(location.line, location.column);
  const end = new VSCode.Position(location.line, location.column);
  const range = new VSCode.Range(start, end);
  list.push(new VSCode.Diagnostic(range, getMessage(error), VSCode.DiagnosticSeverity.Error));
};

/**
 * Get all the text from the given document.
 * @param document Input document.
 * @returns Returns the text.
 */
const getText = (document: VSCode.TextDocument): string => {
  const first = document.lineAt(0);
  const last = document.lineAt(document.lineCount - 1);
  return document.getText(new VSCode.Range(first.range.start, last.range.end));
};

/**
 * Update the specified diagnostics collection based on the given document.
 * @param document Input document.
 * @param collection Diagnostics collection.
 */
export const update = (document: VSCode.TextDocument, collection: VSCode.DiagnosticCollection): void => {
  collection.clear();
  if (document && document.languageId === 'xcheme') {
    const context = new Core.Context('diagnostics');
    const project = new Lang.Project(new Lang.TextCoder());
    const text = getText(document);
    Lang.Lexer.consumeText(text, context);
    Lang.Parser.consumeTokens(context.tokens, context);
    if (context.errors.length === 0) {
      Lang.Maker.consumeNodes(context.node, project);
    }
    const list: VSCode.Diagnostic[] = [];
    for (const error of [...context.errors, ...project.errors]) {
      pushMessage(list, error);
    }
    collection.set(document.uri, list);
  }
};

import * as VSCode from 'vscode';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

/**
 * Consume the specified document.
 * @param document Input document.
 * @returns Returns the consumption context.
 */
export const consumeDocument = (document: VSCode.TextDocument): Core.Context => {
  const begin = document.lineAt(0).range.start;
  const end = document.lineAt(document.lineCount - 1).range.end;
  const text = document.getText(new VSCode.Range(begin, end));
  const context = new Core.Context(document.uri.path);
  Lang.Lexer.consumeText(text, context);
  Lang.Parser.consumeTokens(context.tokens, context);
  return context;
};

/**
 * Tokenize the specified document range.
 * @param document Input document.
 * @param start Start position in the document.
 * @param end End position in the document.
 * @returns Returns the tokenization context.
 */
export const tokenizeDocumentRange = (
  document: VSCode.TextDocument,
  start: VSCode.Position,
  end: VSCode.Position
): Core.Context => {
  const context = new Core.Context(document.uri.path);
  const text = document.getText(new VSCode.Range(start, end));
  Lang.Lexer.consumeText(text, context);
  return context;
};

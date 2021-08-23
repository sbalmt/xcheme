import * as VSCode from 'vscode';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

/**
 * Get all the text content from the given document.
 * @param document Input document.
 * @returns Returns the text.
 */
const getTextContent = (document: VSCode.TextDocument): string => {
  const first = document.lineAt(0);
  const last = document.lineAt(document.lineCount - 1);
  return document.getText(new VSCode.Range(first.range.start, last.range.end));
};

/**
 * Consume the specified document.
 * @param document Input document.
 * @returns Returns the consumption context.
 */
export const consumeDocument = (document: VSCode.TextDocument): Core.Context => {
  const context = new Core.Context(document.uri.path);
  const text = getTextContent(document);
  Lang.Lexer.consumeText(text, context);
  Lang.Parser.consumeTokens(context.tokens, context);
  return context;
};

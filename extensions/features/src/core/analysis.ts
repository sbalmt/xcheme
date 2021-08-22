import * as VSCode from 'vscode';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

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
 * Consume the specified document.
 * @param document Input document.
 * @returns Returns the consumption context.
 */
export const consume = (document: VSCode.TextDocument): Core.Context => {
  const context = new Core.Context(document.uri.path);
  const text = getText(document);
  Lang.Lexer.consumeText(text, context);
  Lang.Parser.consumeTokens(context.tokens, context);
  return context;
};

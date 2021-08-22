import * as VSCode from 'vscode';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Items from './completion/items';
import * as Analysis from './analysis';

/**
 * Completion provider.
 */
export class Provider implements VSCode.CompletionItemProvider<VSCode.CompletionItem> {
  /**
   * Determines whether or not the specified tokens before the given offset compound a valid identity.
   * @param tokens Input tokens.
   * @param offset Current offset.
   * @returns Returns true in case of success, false otherwise.
   */
  #isIdentity(tokens: Core.Token[], offset: number): boolean {
    return tokens[offset - 1]?.value === Lang.Lexer.Tokens.Number && tokens[offset - 2]?.value === Lang.Lexer.Tokens.OpenChevron;
  }

  /**
   * Determines whether or not the specified tokens before the given offset compound a valid identifier.
   * @param tokens Input tokens.
   * @param offset Current offset.
   * @returns Returns true in case of success, false otherwise.
   */
  #isIdentifier(tokens: Core.Token[], offset: number): boolean {
    const index = offset - 1;
    return (
      (tokens[index]?.value === Lang.Lexer.Tokens.CloseChevron && this.#isIdentity(tokens, index)) ||
      tokens[index]?.value === Lang.Lexer.Tokens.Token ||
      tokens[index]?.value === Lang.Lexer.Tokens.Node
    );
  }

  /**
   * Get a completion list for all the symbols in the specified table.
   * @param table Input table.
   * @returns Returns the completion list.
   */
  #getSymbols(table: Core.Table): VSCode.CompletionItem[] {
    const list = [];
    for (const name of table.keys) {
      const record = table.getRecord(name)!;
      const item = new VSCode.CompletionItem(name, VSCode.CompletionItemKind.Reference);
      item.documentation = `Insert a ${record.value === Lang.Parser.Symbols.Node ? 'node' : 'token'} reference.`;
      list.push(item);
    }
    return list;
  }

  /**
   * Provide completion items for the given position and document.
   * @param document Input document.
   * @returns Returns the completion items list.
   */
  provideCompletionItems(document: VSCode.TextDocument): VSCode.ProviderResult<VSCode.CompletionItem[]> {
    const context = Analysis.consume(document);
    const tokens = context.tokens;
    if (tokens.length > 0) {
      const index = tokens.length - 1;
      const last = tokens[index];
      switch (last.value) {
        case Lang.Lexer.Tokens.Skip:
          return Items.operandList;
        case Lang.Lexer.Tokens.Alias:
          return [Items.tokenItem, Items.nodeItem];
        case Lang.Lexer.Tokens.Token:
        case Lang.Lexer.Tokens.Node:
          return [Items.identityItem, Items.identifierItem];
        case Lang.Lexer.Tokens.CloseChevron:
          return this.#isIdentity(tokens, index) ? [Items.identifierItem] : [];
        case Lang.Lexer.Tokens.Identifier:
          return this.#isIdentifier(tokens, index) ? [Items.asItem] : Items.binaryOperatorList;
        case Lang.Lexer.Tokens.As:
        case Lang.Lexer.Tokens.Then:
        case Lang.Lexer.Tokens.Else:
        case Lang.Lexer.Tokens.Or:
        case Lang.Lexer.Tokens.And:
          return [...this.#getSymbols(context.table), ...Items.operandList, ...Items.unaryOperatorList];
        case Lang.Lexer.Tokens.Not:
        case Lang.Lexer.Tokens.Opt:
        case Lang.Lexer.Tokens.Repeat:
        case Lang.Lexer.Tokens.Left:
        case Lang.Lexer.Tokens.Right:
        case Lang.Lexer.Tokens.Next:
        case Lang.Lexer.Tokens.Pivot:
        case Lang.Lexer.Tokens.Symbol:
        case Lang.Lexer.Tokens.Scope:
        case Lang.Lexer.Tokens.Error:
        case Lang.Lexer.Tokens.Has:
        case Lang.Lexer.Tokens.Set:
          return [...this.#getSymbols(context.table), ...Items.operandList, ...Items.unaryOperatorList];
        case Lang.Lexer.Tokens.Place:
        case Lang.Lexer.Tokens.Append:
        case Lang.Lexer.Tokens.Prepend:
          return [...this.#getSymbols(context.table), ...Items.operandList, ...Items.directionList, ...Items.unaryOperatorList];
        case Lang.Lexer.Tokens.From:
          return [Items.wordItem];
        case Lang.Lexer.Tokens.To:
        case Lang.Lexer.Tokens.Alphabet:
        case Lang.Lexer.Tokens.Any:
          return Items.binaryOperatorList;
      }
    }
    return [Items.skipItem, Items.aliasItem, Items.tokenItem, Items.nodeItem];
  }
}

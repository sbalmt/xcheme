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
   * Determines whether or not the tokens before the given offset compound a valid identity.
   * @param tokens Input tokens.
   * @param offset Current offset.
   * @returns Returns true in case of success, false otherwise.
   */
  #isIdentity(tokens: Core.Token[], offset: number): boolean {
    return tokens[offset - 1]?.value === Lang.Lexer.Tokens.Number && tokens[offset - 2]?.value === Lang.Lexer.Tokens.OpenChevron;
  }

  /**
   * Determines whether or not the tokens before the given offset compound a valid identifier.
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
   * @param types Symbol types for filtering.
   * @returns Returns the completion list.
   */
  #getSymbolList(table: Core.Table, types: Lang.Parser.Symbols[]): VSCode.CompletionItem[] {
    const list = [];
    for (const name of table.names) {
      const record = table.get(name)!;
      if (types.includes(record.value as Lang.Parser.Symbols)) {
        const item = Items.getItem(name, `Insert a the reference.`, {
          kind: VSCode.CompletionItemKind.Reference
        });
        list.push(item);
      }
    }
    return list;
  }

  /**
   * Get the symbol filters according to the node or token before the given offset.
   * @param tokens Input tokens.
   * @param offset Current offset.
   * @returns Returns the corresponding filters.
   */
  #getSymbolFilters(tokens: Core.Token[], offset: number): Lang.Parser.Symbols[] {
    for (let index = offset - 1; index >= 0; --index) {
      switch (tokens[index].value) {
        case Lang.Lexer.Tokens.Skip:
          return [Lang.Parser.Symbols.AliasToken];
        case Lang.Lexer.Tokens.Token:
          return [Lang.Parser.Symbols.Token, Lang.Parser.Symbols.AliasToken];
        case Lang.Lexer.Tokens.Node:
          return [Lang.Parser.Symbols.Token, Lang.Parser.Symbols.Node, Lang.Parser.Symbols.AliasNode];
      }
    }
    return [];
  }

  /**
   * Get the token index that corresponds to the specified position in the given document.
   * @param tokens Input tokens.
   * @param document Input document.
   * @param position Position in the document.
   * @returns Returns the corresponding token index.
   */
  #getTokenIndex(tokens: Core.Token[], document: VSCode.TextDocument, position: VSCode.Position): number {
    const offset = document.offsetAt(position);
    const index = tokens.findIndex((token) => token.fragment.end >= offset) - 1;
    return index < 0 ? tokens.length - 1 : index;
  }

  /**
   * Provide completion items for the given position and document.
   * @param document Input document.
   * @param position Position in the document.
   * @returns Returns the completion items list.
   */
  provideCompletionItems(document: VSCode.TextDocument, position: VSCode.Position): VSCode.ProviderResult<VSCode.CompletionItem[]> {
    const context = Analysis.consumeDocument(document);
    const tokens = context.tokens;
    if (tokens.length > 0) {
      const index = this.#getTokenIndex(tokens, document, position);
      switch (tokens[index].value) {
        case Lang.Lexer.Tokens.Skip:
          return Items.operandList;
        case Lang.Lexer.Tokens.Alias:
          return [Items.tokenItem, Items.nodeItem];
        case Lang.Lexer.Tokens.Token:
        case Lang.Lexer.Tokens.Node:
          return [Items.identityItem, Items.identifierItem];
        case Lang.Lexer.Tokens.OpenChevron:
          return [];
        case Lang.Lexer.Tokens.CloseChevron:
          return this.#isIdentity(tokens, index) ? [Items.identifierItem] : [];
        case Lang.Lexer.Tokens.Identifier:
          return this.#isIdentifier(tokens, index) ? [Items.asItem] : Items.binaryOperatorList;
        case Lang.Lexer.Tokens.As:
        case Lang.Lexer.Tokens.Then:
        case Lang.Lexer.Tokens.Else:
        case Lang.Lexer.Tokens.Or:
        case Lang.Lexer.Tokens.And:
          return [
            ...this.#getSymbolList(context.table, this.#getSymbolFilters(tokens, index)),
            ...Items.operandList,
            ...Items.unaryOperatorList
          ];
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
        case Lang.Lexer.Tokens.OpenParentheses:
          return [
            ...this.#getSymbolList(context.table, this.#getSymbolFilters(tokens, index)),
            ...Items.operandList,
            ...Items.unaryOperatorList
          ];
        case Lang.Lexer.Tokens.Place:
        case Lang.Lexer.Tokens.Append:
        case Lang.Lexer.Tokens.Prepend:
          return [
            ...this.#getSymbolList(context.table, this.#getSymbolFilters(tokens, index)),
            ...Items.operandList,
            ...Items.directionList,
            ...Items.unaryOperatorList
          ];
        case Lang.Lexer.Tokens.From:
          return [Items.wordItem];
        case Lang.Lexer.Tokens.To:
        case Lang.Lexer.Tokens.String:
        case Lang.Lexer.Tokens.Any:
        case Lang.Lexer.Tokens.CloseParentheses:
          return Items.binaryOperatorList;
      }
    }
    return [Items.skipItem, Items.aliasItem, Items.tokenItem, Items.nodeItem];
  }
}

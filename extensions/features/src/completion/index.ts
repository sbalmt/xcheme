import * as VSCode from 'vscode';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Items from './items';
import * as Analysis from '../common/analysis';

/**
 * Completion items type.
 */
type CompletionItems = VSCode.ProviderResult<VSCode.CompletionItem[]>;

/**
 * Auto completion provider.
 */
export class Provider implements VSCode.CompletionItemProvider<VSCode.CompletionItem> {
  /**
   * Determines whether or not the token before the given offset compound a valid identity.
   * @param tokens Input tokens.
   * @param offset Current offset.
   * @returns Returns true in case of success, false otherwise.
   */
  #isIdentity(tokens: Core.Token[], offset: number): boolean {
    return tokens[offset]?.value === Lang.Lexer.Tokens.Number && tokens[offset - 1]?.value === Lang.Lexer.Tokens.OpenChevron;
  }

  /**
   * Determines whether or not the token before the given offset compound a valid identifier.
   * @param tokens Input tokens.
   * @param offset Current offset.
   * @returns Returns true in case of success, false otherwise.
   */
  #isIdentifier(tokens: Core.Token[], offset: number): boolean {
    const value = tokens[offset]?.value;
    return (
      (value === Lang.Lexer.Tokens.CloseChevron && this.#isIdentity(tokens, offset)) ||
      value === Lang.Lexer.Tokens.Token ||
      value === Lang.Lexer.Tokens.Node
    );
  }

  /**
   * Provide basic completion items for the given tokens and offset.
   * @param tokens Input tokens.
   * @param offset Token offset.
   * @returns Returns an array of completion items or undefined when there's no basic completion items to suggest.
   */
  #basicItems(tokens: Core.Token[], offset: number): CompletionItems | undefined {
    switch (tokens[offset--].value) {
      case Lang.Lexer.Tokens.CloseChevron:
        return this.#isIdentity(tokens, offset) ? [Items.identifierItem] : [];
      case Lang.Lexer.Tokens.Identifier:
        return this.#isIdentifier(tokens, offset) ? [Items.asItem] : Items.binaryOperatorList;
      case Lang.Lexer.Tokens.Skip:
        return Items.operandList;
      case Lang.Lexer.Tokens.Alias:
        return [Items.tokenItem, Items.nodeItem];
      case Lang.Lexer.Tokens.Token:
      case Lang.Lexer.Tokens.Node:
        return [Items.identityItem, Items.identifierItem];
      case Lang.Lexer.Tokens.From:
        return [Items.wordItem];
      case Lang.Lexer.Tokens.To:
      case Lang.Lexer.Tokens.String:
      case Lang.Lexer.Tokens.Any:
      case Lang.Lexer.Tokens.CloseParenthesis:
        return Items.binaryOperatorList;
      case Lang.Lexer.Tokens.OpenBraces:
        return [Items.identityItem, Items.identifierItem, Items.wordItem];
      case Lang.Lexer.Tokens.Map:
      case Lang.Lexer.Tokens.OpenChevron:
        return [];
    }
    return void 0;
  }

  /**
   * Get the symbol filters according to the node or token before the given offset.
   * @param tokens Input tokens.
   * @param offset Token offset.
   * @returns Returns the corresponding filters.
   */
  #getSymbolFilters(tokens: Core.Token[], offset: number): Lang.Parser.Symbols[] {
    while (offset >= 0) {
      switch (tokens[offset--].value) {
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
   * Get a symbol table path based on the given tokens and offset.
   * @param tokens Input tokens.
   * @param offset Token offset.
   * @returns Returns the symbol table path compound by all the record names.
   */
  #getSymbolTablePath(tokens: Core.Token[], offset: number): string[] {
    const path = [];
    do {
      const token = tokens[offset--];
      if (token?.value === Lang.Lexer.Tokens.Identifier) {
        path.unshift(token.fragment.data);
      }
    } while (tokens[offset--]?.value === Lang.Lexer.Tokens.Period);
    return path;
  }

  /**
   * Get the symbol table that corresponds to the specified path.
   * @param table First symbol table.
   * @param path Symbol table path.
   * @returns Returns the corresponding symbol table or undefined when the given path doesn't exists.
   */
  #getSymbolTableFromPath(table: Core.Table, path: string[]): Core.Table | undefined {
    for (const name of path) {
      const record = table.get(name);
      if (!record || !record.link) {
        return void 0;
      }
      table = record.link;
    }
    return table;
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
        const link = record.link !== void 0;
        const item = Items.getItem(name, `Insert the reference.`, {
          kind: VSCode.CompletionItemKind.Reference,
          text: link ? `${name}.` : name,
          space: !link
        });
        list.push(item);
      }
    }
    return list;
  }

  /**
   * Consume the given document and provide complex completion items for the specified token offset.
   * @param document Input document.
   * @param offset Token offset.
   * @returns Returns an array of completion items or undefined when there's no basic completion items to suggest.
   */
  #complexItems(document: VSCode.TextDocument, offset: number): CompletionItems | undefined {
    const context = Analysis.consumeDocument(document);
    const tokens = context.tokens;
    switch (tokens[offset--].value) {
      case Lang.Lexer.Tokens.Period:
        const path = this.#getSymbolTablePath(tokens, offset);
        const table = this.#getSymbolTableFromPath(context.table, path);
        return table ? this.#getSymbolList(table, [Lang.Parser.Symbols.Member]) : [];
      case Lang.Lexer.Tokens.As:
      case Lang.Lexer.Tokens.Then:
      case Lang.Lexer.Tokens.Else:
      case Lang.Lexer.Tokens.Or:
      case Lang.Lexer.Tokens.And:
        return [
          ...this.#getSymbolList(context.table, this.#getSymbolFilters(tokens, offset)),
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
      case Lang.Lexer.Tokens.OpenParenthesis:
        return [
          ...this.#getSymbolList(context.table, this.#getSymbolFilters(tokens, offset)),
          ...Items.operandList,
          ...Items.unaryOperatorList
        ];
      case Lang.Lexer.Tokens.Place:
      case Lang.Lexer.Tokens.Append:
      case Lang.Lexer.Tokens.Prepend:
        return [
          ...this.#getSymbolList(context.table, this.#getSymbolFilters(tokens, offset)),
          ...Items.operandList,
          ...Items.directionList,
          ...Items.unaryOperatorList
        ];
    }
    return void 0;
  }

  /**
   * Provide completion items for the given position and document.
   * @param document Input document.
   * @param position Position in the document.
   * @returns Returns the completion items list.
   */
  provideCompletionItems(document: VSCode.TextDocument, position: VSCode.Position): CompletionItems {
    const range = Analysis.tokenizeDocumentRange(document, document.lineAt(0).range.start, position);
    const tokens = range.tokens;
    if (tokens.length > 0) {
      const offset = range.tokens.length - 1;
      const items = this.#basicItems(tokens, offset) || this.#complexItems(document, offset);
      if (items) {
        return items;
      }
    }
    return [Items.skipItem, Items.aliasItem, Items.tokenItem, Items.nodeItem];
  }
}

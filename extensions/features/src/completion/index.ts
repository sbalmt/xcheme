import * as VSCode from 'vscode';
import * as Path from 'path';

import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Utils from '../utils';
import * as Diagnostics from '../diagnostics';
import * as Items from './items';

/**
 * Completion items type.
 */
type CompletionItems = VSCode.ProviderResult<VSCode.CompletionItem[]>;

/**
 * Auto completion provider.
 */
export class Provider implements VSCode.CompletionItemProvider<VSCode.CompletionItem> {
  /**
   * Diagnostics cache.
   */
  #cache: Diagnostics.Cache;

  /**
   * Determines whether or not the token before the given offset compound a valid identity.
   * @param tokens Tokens list.
   * @param offset Current offset.
   * @returns Returns true in case of success, false otherwise.
   */
  #isIdentity(tokens: Core.Token[], offset: number): boolean {
    const value = tokens[offset]?.value;
    return (
      (value === Lang.Lexer.Tokens.Number || value === Lang.Lexer.Tokens.Auto) &&
      tokens[offset - 1]?.value === Lang.Lexer.Tokens.OpenChevron
    );
  }

  /**
   * Determines whether or not the token before the given offset compound a valid identifier.
   * @param tokens Tokens list.
   * @param offset Current offset.
   * @returns Returns true in case of success, false otherwise.
   */
  #isIdentifier(tokens: Core.Token[], offset: number): boolean {
    const value = tokens[offset]?.value;
    return (
      (value === Lang.Lexer.Tokens.CloseChevron && this.#isIdentity(tokens, offset - 1)) ||
      value === Lang.Lexer.Tokens.Token ||
      value === Lang.Lexer.Tokens.Node
    );
  }

  /**
   * Get the symbol filters according to the node or token before the given offset.
   * @param tokens Tokens list.
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
   * @param tokens Tokens list.
   * @param offset Token offset.
   * @returns Returns an array containing all records for the corresponding path.
   */
  #getSymbolTablePath(tokens: Core.Token[], offset: number): string[] {
    const records = [];
    do {
      const token = tokens[offset--];
      if (token?.value === Lang.Lexer.Tokens.Identifier) {
        records.unshift(token.fragment.data);
      }
    } while (tokens[offset--]?.value === Lang.Lexer.Tokens.Period);
    return records;
  }

  /**
   * Get the symbol table that corresponds to the specified path.
   * @param table First symbol table.
   * @param path Symbol table path.
   * @returns Returns the corresponding symbol table or undefined when the given path doesn't exists.
   */
  #getSymbolTableFromPath(table: Lang.Types.Table, path: string[]): Lang.Types.Table | undefined {
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
   * Get the completion item kind based on the given symbol record.
   * @param record Symbol record.
   * @returns Returns the corresponding completion item kind.
   */
  #getItemKind(record: Lang.Types.Record): VSCode.CompletionItemKind {
    if (record.link) {
      return VSCode.CompletionItemKind.Class;
    } else {
      switch (record.value) {
        case Lang.Parser.Symbols.Node:
        case Lang.Parser.Symbols.Token:
          return VSCode.CompletionItemKind.Method;
        case Lang.Parser.Symbols.AliasNode:
        case Lang.Parser.Symbols.AliasToken:
        case Lang.Parser.Symbols.MapMember:
          return VSCode.CompletionItemKind.Field;
      }
    }
    return VSCode.CompletionItemKind.Reference;
  }

  /**
   * Get a completion items list for all .xcm files in the current workspace.
   * @param document Current document.
   * @returns Returns the completion items list.
   */
  #getFileList(document: VSCode.TextDocument): CompletionItems {
    const path = Utils.getDirectory(document);
    return VSCode.workspace.findFiles('**/*.xcm', null, 10).then((uriFiles) => {
      const items = [];
      for (const uri of uriFiles) {
        const relative = Path.relative(path, uri.fsPath);
        items.push(
          Items.getItem(relative, 'Import file.', {
            kind: VSCode.CompletionItemKind.File,
            text: relative.replace(/\\/g, '/').replace(/\.xcm/g, '')
          })
        );
      }
      return items;
    });
  }

  /**
   * Get a completion items list for all the symbols in the given symbol table.
   * @param table Symbol table.
   * @param types Symbol types for filtering.
   * @returns Returns the completion items list.
   */
  #getSymbolList(table: Lang.Types.Table, types: Lang.Parser.Symbols[]): VSCode.CompletionItem[] {
    const list = [];
    for (const name of table.names) {
      const record = table.get(name)!;
      if (record.data.origin === Lang.Types.Origins.User && types.includes(record.value as Lang.Parser.Symbols)) {
        const link = !!record.link;
        const item = Items.getItem(name, `Insert the ${name} reference.`, {
          kind: this.#getItemKind(record),
          text: link ? `${name}.` : name,
          retry: link
        });
        list.push(item);
      }
    }
    return list;
  }

  /**
   * Find the best token offset for the given offset position.
   * @param tokens Tokens list.
   * @param position Offset position.
   * @returns Returns the best token offset.
   */
  #findBestOffset(tokens: Core.Token[], position: number): number {
    let best = -1;
    for (let index = 0; index < tokens.length; ++index) {
      const token = tokens[index];
      if (token.fragment.end === position) {
        return index;
      }
      if (token.fragment.begin < position) {
        best = index;
      }
    }
    return best;
  }

  /**
   * Consume the given document and provide all the completion items for the specified token offset.
   * @param table Symbol table.
   * @param tokens Tokens list.
   * @param offset Token offset.
   * @returns Returns an array of completion items or undefined when there's no completion items to suggest.
   */
  #getCompletionItems(
    document: VSCode.TextDocument,
    table: Lang.Types.Table,
    tokens: Core.Token[],
    offset: number
  ): CompletionItems | undefined {
    if (offset > -1) {
      switch (tokens[offset--].value) {
        case Lang.Lexer.Tokens.Import:
          return this.#getFileList(document);
        case Lang.Lexer.Tokens.Export:
          return [Items.aliasItem, Items.tokenItem, Items.nodeItem];
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
        case Lang.Lexer.Tokens.Asterisk:
        case Lang.Lexer.Tokens.CloseBraces:
        case Lang.Lexer.Tokens.CloseParenthesis:
          return Items.binaryOperatorList;
        case Lang.Lexer.Tokens.Comma:
        case Lang.Lexer.Tokens.OpenBraces:
          return [Items.identityItem, Items.identifierItem, Items.wordItem];
        case Lang.Lexer.Tokens.Period:
          const result = this.#getSymbolTableFromPath(table, this.#getSymbolTablePath(tokens, offset));
          return result ? this.#getSymbolList(result, [Lang.Parser.Symbols.MapMember]) : [];
        case Lang.Lexer.Tokens.As:
        case Lang.Lexer.Tokens.Then:
        case Lang.Lexer.Tokens.Else:
        case Lang.Lexer.Tokens.Or:
        case Lang.Lexer.Tokens.VerticalBar:
        case Lang.Lexer.Tokens.And:
        case Lang.Lexer.Tokens.Ampersand:
          return [
            ...this.#getSymbolList(table, this.#getSymbolFilters(tokens, offset)),
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
            ...this.#getSymbolList(table, this.#getSymbolFilters(tokens, offset)),
            ...Items.operandList,
            ...Items.unaryOperatorList
          ];
        case Lang.Lexer.Tokens.Place:
        case Lang.Lexer.Tokens.Append:
        case Lang.Lexer.Tokens.Prepend:
          return [
            ...this.#getSymbolList(table, this.#getSymbolFilters(tokens, offset)),
            ...Items.operandList,
            ...Items.directionList,
            ...Items.unaryOperatorList
          ];
        case Lang.Lexer.Tokens.Map:
        case Lang.Lexer.Tokens.OpenChevron:
          return [];
      }
    }
    return void 0;
  }

  /**
   * Default constructor.
   * @param cache Diagnostics cache.
   */
  constructor(cache: Diagnostics.Cache) {
    this.#cache = cache;
  }

  /**
   * Provide completion items for the given position and document.
   * @param document Current document.
   * @param position Position in the document.
   * @returns Returns the completion items list or undefined when there's no completion items to suggest.
   */
  provideCompletionItems(document: VSCode.TextDocument, position: VSCode.Position): CompletionItems {
    const last = this.#cache.last;
    if (last) {
      const source = last.source;
      const offset = this.#findBestOffset(source.tokens, document.offsetAt(position));
      return (
        this.#getCompletionItems(document, source.table, source.tokens, offset) ?? [
          Items.importItem,
          Items.exportItem,
          Items.skipItem,
          Items.aliasItem,
          Items.tokenItem,
          Items.nodeItem
        ]
      );
    }
    return void 0;
  }
}

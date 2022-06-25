import * as VSCode from 'vscode';
import * as Path from 'path';

import * as Lang from '@xcheme/lang';
import * as Lexer from '@xcheme/lexer';
import * as Parser from '@xcheme/parser';

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
  #isIdentity(tokens: Lang.Types.Token[], offset: number): boolean {
    const value = tokens[offset]?.value;
    return (
      (value === Lexer.Tokens.Number || value === Lexer.Tokens.Auto) &&
      tokens[offset - 1]?.value === Lexer.Tokens.OpenChevron
    );
  }

  /**
   * Determines whether or not the token before the given offset compound a valid identifier.
   * @param tokens Tokens list.
   * @param offset Current offset.
   * @returns Returns true in case of success, false otherwise.
   */
  #isIdentifier(tokens: Lang.Types.Token[], offset: number): boolean {
    const value = tokens[offset]?.value;
    return (
      (value === Lexer.Tokens.CloseChevron && this.#isIdentity(tokens, offset - 1)) ||
      value === Lexer.Tokens.Token ||
      value === Lexer.Tokens.Node
    );
  }

  /**
   * Get the symbol filters according to the node or token before the given offset.
   * @param tokens Tokens list.
   * @param offset Token offset.
   * @returns Returns the corresponding filters.
   */
  #getSymbolFilters(tokens: Lang.Types.Token[], offset: number): Parser.Symbols[] {
    while (offset >= 0) {
      switch (tokens[offset--].value) {
        case Lexer.Tokens.Skip:
          return [Parser.Symbols.AliasToken];
        case Lexer.Tokens.Token:
          return [Parser.Symbols.Token, Parser.Symbols.AliasToken];
        case Lexer.Tokens.Node:
          return [Parser.Symbols.Token, Parser.Symbols.Node, Parser.Symbols.AliasNode];
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
  #getSymbolTablePath(tokens: Lang.Types.Token[], offset: number): string[] {
    const records = [];
    do {
      const token = tokens[offset--];
      if (token?.value === Lexer.Tokens.Identifier) {
        records.unshift(token.fragment.data);
      }
    } while (tokens[offset--]?.value === Lexer.Tokens.Period);
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
        case Parser.Symbols.Node:
        case Parser.Symbols.Token:
          return VSCode.CompletionItemKind.Method;
        case Parser.Symbols.AliasNode:
        case Parser.Symbols.AliasToken:
        case Parser.Symbols.MapMember:
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
  #getSymbolList(table: Lang.Types.Table, types: Parser.Symbols[]): VSCode.CompletionItem[] {
    const list = [];
    for (const name of table.names) {
      const record = table.get(name)!;
      if (record.data.origin === Lang.Types.Origins.User && types.includes(record.value as Parser.Symbols)) {
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
  #findBestOffset(tokens: Lang.Types.Token[], position: number): number {
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
    tokens: Lang.Types.Token[],
    offset: number
  ): CompletionItems | undefined {
    if (offset > -1) {
      switch (tokens[offset--].value) {
        case Lexer.Tokens.Import:
          return this.#getFileList(document);
        case Lexer.Tokens.Export:
          return [Items.aliasItem, Items.tokenItem, Items.nodeItem];
        case Lexer.Tokens.CloseChevron:
          return this.#isIdentity(tokens, offset) ? [Items.identifierItem] : [];
        case Lexer.Tokens.Identifier:
          return this.#isIdentifier(tokens, offset) ? [Items.asItem] : Items.binaryOperatorList;
        case Lexer.Tokens.Skip:
          return Items.operandList;
        case Lexer.Tokens.Alias:
          return [Items.tokenItem, Items.nodeItem];
        case Lexer.Tokens.Token:
        case Lexer.Tokens.Node:
          return [Items.identityItem, Items.identifierItem];
        case Lexer.Tokens.From:
          return [Items.wordItem];
        case Lexer.Tokens.To:
        case Lexer.Tokens.String:
        case Lexer.Tokens.Any:
        case Lexer.Tokens.Asterisk:
        case Lexer.Tokens.CloseBraces:
        case Lexer.Tokens.CloseParenthesis:
          return Items.binaryOperatorList;
        case Lexer.Tokens.Comma:
        case Lexer.Tokens.OpenBraces:
          return [Items.identityItem, Items.identifierItem, Items.wordItem];
        case Lexer.Tokens.Period:
          const result = this.#getSymbolTableFromPath(table, this.#getSymbolTablePath(tokens, offset));
          return result ? this.#getSymbolList(result, [Parser.Symbols.MapMember]) : [];
        case Lexer.Tokens.As:
        case Lexer.Tokens.Then:
        case Lexer.Tokens.Else:
        case Lexer.Tokens.Or:
        case Lexer.Tokens.VerticalBar:
        case Lexer.Tokens.And:
        case Lexer.Tokens.Ampersand:
          return [
            ...this.#getSymbolList(table, this.#getSymbolFilters(tokens, offset)),
            ...Items.operandList,
            ...Items.unaryOperatorList
          ];
        case Lexer.Tokens.Not:
        case Lexer.Tokens.Opt:
        case Lexer.Tokens.Repeat:
        case Lexer.Tokens.Left:
        case Lexer.Tokens.Right:
        case Lexer.Tokens.Next:
        case Lexer.Tokens.Pivot:
        case Lexer.Tokens.Symbol:
        case Lexer.Tokens.Scope:
        case Lexer.Tokens.Error:
        case Lexer.Tokens.Has:
        case Lexer.Tokens.Set:
        case Lexer.Tokens.OpenParenthesis:
          return [
            ...this.#getSymbolList(table, this.#getSymbolFilters(tokens, offset)),
            ...Items.operandList,
            ...Items.unaryOperatorList
          ];
        case Lexer.Tokens.Place:
        case Lexer.Tokens.Append:
        case Lexer.Tokens.Prepend:
          return [
            ...this.#getSymbolList(table, this.#getSymbolFilters(tokens, offset)),
            ...Items.operandList,
            ...Items.directionList,
            ...Items.unaryOperatorList
          ];
        case Lexer.Tokens.Map:
        case Lexer.Tokens.OpenChevron:
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

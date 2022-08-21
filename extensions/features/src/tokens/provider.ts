import * as VSCode from 'vscode';

import * as Core from '@xcheme/core';
import * as Parser from '@xcheme/parser';
import * as Lang from '@xcheme/lang';

import * as Utils from '../utils';
import * as Diagnostics from '../diagnostics';

import { Legend } from './legend';

/**
 * Semantic tokens result type.
 */
type SemanticTokensResult = VSCode.ProviderResult<VSCode.SemanticTokens>;

/**
 * Get the corresponding token modifiers for the given token record.
 * @param record Token record.
 * @returns Returns an array containing all the corresponding modifiers.
 */
const getTokenModifiers = (record: Lang.Types.SymbolRecord): string[] => {
  const modifiers = [];
  if (record.value === Parser.Symbols.AliasToken || record.value === Parser.Symbols.AliasNode) {
    modifiers.push('alias');
  }
  if (record.assigned) {
    const { template, exported, imported } = record.data;
    template && modifiers.push('template');
    exported && modifiers.push('export');
    imported && modifiers.push('import');
  }
  return modifiers;
};

/**
 * Build a new token for the given location and record using the specified builder.
 * @param builder Token builder.
 * @param location Token location.
 * @param record Token record.
 */
const buildToken = (
  builder: VSCode.SemanticTokensBuilder,
  location: Core.Location,
  record: Lang.Types.SymbolRecord
): void => {
  const range = Utils.getRange(location);
  const modifiers = getTokenModifiers(record);
  switch (record.value) {
    case Parser.Symbols.Token:
    case Parser.Symbols.AliasToken:
      builder.push(range, 'token', modifiers);
      break;
    case Parser.Symbols.Node:
    case Parser.Symbols.AliasNode:
      builder.push(range, 'node', modifiers);
      break;
    case Parser.Symbols.AliasParameter:
      builder.push(range, 'parameter', modifiers);
      break;
    case Parser.Symbols.MapMember:
      builder.push(range, 'member', modifiers);
      break;
  }
};

/**
 * Build all tokens for the given node.
 * @param builder Token builder.
 * @param node Node tree.
 * @param name Context name.
 */
const buildAllTokens = (builder: VSCode.SemanticTokensBuilder, node: Lang.Types.Node, name: string): void => {
  const fragment = node.fragment;
  const location = fragment.location;
  if (location.name === name && (node.value === Parser.Nodes.Identifier || node.value === Parser.Nodes.Reference)) {
    const record = node.assigned ? node.data.record : node.table.find(fragment.data);
    if (record) {
      buildToken(builder, location, record);
    }
  }
  if (node.left) {
    buildAllTokens(builder, node.left, name);
  }
  if (node.right) {
    buildAllTokens(builder, node.right, name);
  }
  if (node.next) {
    buildAllTokens(builder, node.next, name);
  }
};

/**
 * Semantic tokens provider.
 */
export class Provider implements VSCode.DocumentSemanticTokensProvider {
  /**
   * Diagnostics cache.
   */
  #cache: Diagnostics.Cache;

  /**
   * Default constructor.
   * @param cache Diagnostics cache.
   */
  constructor(cache: Diagnostics.Cache) {
    this.#cache = cache;
  }

  /**
   * Provide semantic tokens for the given document.
   * @param document Current document.
   * @param token Cancellation token for the current operation.
   * @returns Returns the semantic tokens or undefined when there are no semantic tokens to generate.
   */
  provideDocumentSemanticTokens(document: VSCode.TextDocument, token: VSCode.CancellationToken): SemanticTokensResult {
    const last = this.#cache.last;
    if (last) {
      const builder = new VSCode.SemanticTokensBuilder(Legend);
      const node = last.source.node;
      if (node) {
        buildAllTokens(builder, node, last.source.name);
        return builder.build();
      }
    }
    return void 0;
  }
}

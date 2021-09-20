import * as Core from '@xcheme/core';

import * as Parser from '../../parser';
import * as Entries from '../../core/entries';
import * as Identity from '../../optimizer/nodes/identity';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';
import { State, Types } from '../context';

import type { PatternEntry } from '../coder/base';

/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' pattern context.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project: Project, node: Core.Node, state: State, symbol: Core.Record): PatternEntry | undefined => {
  if (symbol.value === Parser.Symbols.Token || symbol.value === Parser.Symbols.AliasToken) {
    const identifier = node.fragment.data;
    if (state.pointers.has(identifier)) {
      return project.coder.emitReferencePattern(project.tokenPointerEntries, identifier);
    }
    const token = project.tokenEntries.get(identifier);
    if (token !== void 0) {
      project.tokenPointerEntries.add(Entries.Types.Normal, identifier, token.identity, token.pattern);
    }
    state.pointers.add(identifier);
    return project.coder.emitReferencePattern(project.tokenPointerEntries, identifier);
  }
  return void 0;
};

/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' pattern context.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project: Project, node: Core.Node, state: State, symbol: Core.Record): PatternEntry | undefined => {
  if (node instanceof Identity.Node) {
    return project.coder.emitExpectUnitsPattern([node.identity]);
  } else if (symbol.value === Parser.Symbols.Node || symbol.value === Parser.Symbols.AliasNode) {
    const identifier = node.fragment.data;
    if (state.pointers.has(identifier)) {
      return project.coder.emitReferencePattern(project.nodePointerEntries, identifier);
    }
    const entry = project.nodeEntries.get(identifier);
    if (entry !== void 0) {
      project.nodePointerEntries.add(Entries.Types.Normal, identifier, entry.identity, entry.pattern);
    }
    state.pointers.add(identifier);
    return project.coder.emitReferencePattern(project.nodePointerEntries, identifier);
  }
  return void 0;
};

/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' pattern context.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project: Project, node: Core.Node, state: State, symbol: Core.Record): PatternEntry | undefined => {
  if (symbol.value === Parser.Symbols.AliasToken) {
    const identifier = node.fragment.data;
    if (state.pointers.has(identifier)) {
      return project.coder.emitReferencePattern(project.tokenPointerEntries, identifier);
    }
    const entry = project.tokenEntries.get(identifier);
    if (entry !== void 0) {
      project.tokenPointerEntries.add(Entries.Types.Normal, identifier, entry.identity, entry.pattern);
    }
    state.pointers.add(identifier);
    return project.coder.emitReferencePattern(project.tokenPointerEntries, identifier);
  }
  return void 0;
};

/**
 * Consume the specified input node resolving its reference pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const name = node.fragment.data;
  const symbol = node.table.find(name);
  if (symbol !== void 0) {
    switch (state.type) {
      case Types.Token:
        return resolveToken(project, node, state, symbol);
      case Types.Node:
        return resolveNode(project, node, state, symbol);
      case Types.Skip:
        return resolveSkip(project, node, state, symbol);
    }
  }
  project.errors.push(new Core.Error(node.fragment, Errors.UNDEFINED_IDENTIFIER));
  return void 0;
};

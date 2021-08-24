import * as Core from '@xcheme/core';

import * as Parser from '../../parser';
import * as Entries from '../common/entries';

import { Errors } from '../../core/errors';
import { Project } from '../common/project';
import { State, Types } from '../common/context';

import type { PatternEntry } from '../coder/base';

/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' pattern context.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project: Project, node: Core.Node, state: State, symbol: Core.Record): PatternEntry | undefined => {
  let pattern;
  if (symbol.value === Parser.Symbols.Token || symbol.value === Parser.Symbols.AliasToken) {
    const name = node.fragment.data;
    if (state.pointers.has(name)) {
      pattern = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
    } else {
      const token = project.tokenEntries.get(name);
      if (token) {
        project.tokenPointerEntries.add(token.identity, name, token.pattern, Entries.Types.Normal);
      }
      pattern = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
      state.pointers.add(name);
    }
  } else if (symbol.value === Parser.Symbols.Node) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_NODE_REFERENCE));
  } else if (symbol.value === Parser.Symbols.AliasNode) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_ALIAS_NODE_REFERENCE));
  } else {
    project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_IDENTIFIER));
  }
  return pattern;
};

/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' pattern context.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project: Project, node: Core.Node, state: State, symbol: Core.Record): PatternEntry | undefined => {
  let pattern;
  if (symbol.value === Parser.Symbols.Node || symbol.value === Parser.Symbols.AliasNode) {
    const name = node.fragment.data;
    if (state.pointers.has(name)) {
      pattern = project.coder.emitReferencePattern(project.nodePointerEntries, name);
    } else {
      const entry = project.nodeEntries.get(name);
      if (entry) {
        project.nodePointerEntries.add(entry.identity, name, entry.pattern, Entries.Types.Normal);
      }
      pattern = project.coder.emitReferencePattern(project.nodePointerEntries, name);
      state.pointers.add(name);
    }
  } else if (symbol.value === Parser.Symbols.Token) {
    const name = node.fragment.data;
    const token = project.tokenEntries.get(name);
    if (!token) {
      project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_TOKEN_REFERENCE));
    } else {
      pattern = project.coder.emitStringPattern([token.identity]);
    }
  } else if (symbol.value === Parser.Symbols.AliasToken) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_ALIAS_TOKEN_REFERENCE));
  } else {
    project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_IDENTIFIER));
  }
  return pattern;
};

/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' pattern context.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project: Project, node: Core.Node, state: State, symbol: Core.Record): PatternEntry | undefined => {
  let pattern;
  if (symbol.value === Parser.Symbols.AliasToken) {
    const name = node.fragment.data;
    if (state.pointers.has(name)) {
      pattern = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
    } else {
      const token = project.tokenEntries.get(name);
      if (!token) {
        project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_TOKEN_REFERENCE));
      } else {
        project.tokenPointerEntries.add(token.identity, name, token.pattern, Entries.Types.Normal);
        pattern = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
        state.pointers.add(name);
      }
    }
  } else if (symbol.value === Parser.Symbols.Token) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_TOKEN_REFERENCE));
  } else if (symbol.value === Parser.Symbols.Node) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_NODE_REFERENCE));
  } else if (symbol.value === Parser.Symbols.AliasNode) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_ALIAS_NODE_REFERENCE));
  } else {
    project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_IDENTIFIER));
  }
  return pattern;
};

/**
 * Consume the specified input node resolving its reference pattern.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const name = node.fragment.data;
  const symbol = node.table?.get(name);
  if (symbol) {
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

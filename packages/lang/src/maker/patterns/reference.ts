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
  const name = node.fragment.data;
  if (symbol.value !== Parser.Symbols.Token) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_NODE_REFERENCE));
    return void 0;
  }
  if (state.pointers.has(name)) {
    return project.coder.getReference(project.tokenPointerEntries, name);
  }
  const token = project.tokenEntries.get(name);
  if (token) {
    project.tokenPointerEntries.add(token.identity, name, token.pattern, Entries.Types.Normal);
  }
  state.pointers.add(name);
  return project.coder.getReference(project.tokenPointerEntries, name);
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
  const name = node.fragment.data;
  if (symbol.value === Parser.Symbols.Node) {
    if (state.pointers.has(name)) {
      return project.coder.getReference(project.nodePointerEntries, name);
    }
    const node = project.nodeEntries.get(name);
    if (node) {
      project.nodePointerEntries.add(node.identity, name, node.pattern, Entries.Types.Normal);
    }
    state.pointers.add(name);
    return project.coder.getReference(project.nodePointerEntries, name);
  }
  const token = project.tokenEntries.get(name);
  if (!token) {
    project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_TOKEN_REFERENCE));
  } else {
    if (token.type !== Entries.Types.Alias) {
      return project.coder.getString([token.identity]);
    }
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_ALIAS_TOKEN_REFERENCE));
  }
  return void 0;
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
  const name = node.fragment.data;
  if (symbol.value === Parser.Symbols.Node) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_NODE_REFERENCE));
  } else {
    const token = project.tokenEntries.get(name);
    if (!token) {
      project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_TOKEN_REFERENCE));
    } else {
      if (token.type === Entries.Types.Alias) {
        if (state.pointers.has(name)) {
          return project.coder.getReference(project.tokenPointerEntries, name);
        }
        state.pointers.add(name);
        project.tokenPointerEntries.add(token.identity, name, token.pattern, Entries.Types.Normal);
        return project.coder.getReference(project.tokenPointerEntries, name);
      }
      project.errors.push(new Core.Error(node.fragment, Errors.INVALID_TOKEN_REFERENCE));
    }
  }
  return void 0;
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
    if (state.type === Types.Token) {
      return resolveToken(project, node, state, symbol);
    } else if (state.type === Types.Node) {
      return resolveNode(project, node, state, symbol);
    } else {
      return resolveSkip(project, node, state, symbol);
    }
  }
  project.errors.push(new Core.Error(node.fragment, Errors.UNDEFINED_IDENTIFIER));
  return void 0;
};

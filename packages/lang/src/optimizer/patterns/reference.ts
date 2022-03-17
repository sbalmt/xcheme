import * as Core from '@xcheme/core';

import * as Referenced from '../../core/nodes/referenced';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';
import { Exception } from '../../core/exception';

/**
 * Update the specified node for an optimized one after resolving its reference.
 * @param project Project context.
 * @param record Reference record.
 * @param parent Parent node.
 * @param direction Node direction.
 */
const upgrade = (project: Project.Context, record: Core.Record, parent: Core.Node, direction: Core.Nodes): void => {
  const node = parent.get(direction)!;
  if (!Symbols.isDynamic(record)) {
    const replacement = new Referenced.Node(node, record.data.identity);
    parent.set(direction, replacement);
  } else {
    project.addError(node.fragment, Errors.INVALID_MAP_REFERENCE);
  }
};

/**
 * Find and connect the corresponding reference for the specified record.
 * @param project Project context.
 * @param identifier Reference identifier.
 * @param record Reference record.
 * @param state Consumption state.
 */
const connect = (project: Project.Context, identifier: string, record: Core.Record, state: Context.State): void => {
  const current = state.record!;
  if (record.data.dependencies) {
    current.data.dependencies.push(record);
    record.data.dependents.push(current);
  } else {
    project.symbols.listen(identifier, () => {
      current.data.dependencies.push(record);
      record.data.dependents.push(current);
    });
  }
};

/**
 * Resolve and validate the corresponding reference for the specified record and node in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveSkip = (project: Project.Context, node: Core.Node, record: Core.Record, state: Context.State): void => {
  if (record.value === Parser.Symbols.AliasToken) {
    connect(project, node.fragment.data, record, state);
  } else if (record.value === Parser.Symbols.Token) {
    project.addError(node.fragment, Errors.INVALID_TOKEN_REFERENCE);
  } else if (record.value === Parser.Symbols.AliasNode) {
    project.addError(node.fragment, Errors.INVALID_ALIAS_NODE_REFERENCE);
  } else if (record.value === Parser.Symbols.Node) {
    project.addError(node.fragment, Errors.INVALID_NODE_REFERENCE);
  } else {
    project.addError(node.fragment, Errors.UNRESOLVED_IDENTIFIER);
  }
};

/**
 * Resolve and validate the corresponding reference for the specified record and node in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveToken = (project: Project.Context, node: Core.Node, record: Core.Record, state: Context.State): void => {
  if (record.value === Parser.Symbols.Token || record.value === Parser.Symbols.AliasToken) {
    connect(project, node.fragment.data, record, state);
  } else if (record.value === Parser.Symbols.Node) {
    project.addError(node.fragment, Errors.INVALID_NODE_REFERENCE);
  } else if (record.value === Parser.Symbols.AliasNode) {
    project.addError(node.fragment, Errors.INVALID_ALIAS_NODE_REFERENCE);
  } else {
    project.addError(node.fragment, Errors.UNRESOLVED_IDENTIFIER);
  }
};

/**
 * Resolve and validate the corresponding reference for the specified record and node in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param record Referenced record.
 * @param state Consumption state.
 */
const resolveNode = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  record: Core.Record,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  const identifier = node.fragment.data;
  if (record.value === Parser.Symbols.Node || record.value === Parser.Symbols.AliasNode) {
    connect(project, identifier, record, state);
  } else if (record.value === Parser.Symbols.Token) {
    connect(project, identifier, record, state);
    if (record.data.name !== void 0) {
      upgrade(project, record, parent, direction);
    } else {
      project.symbols.listen(identifier, () => {
        upgrade(project, record, parent, direction);
      });
    }
  } else if (record.value === Parser.Symbols.AliasToken) {
    project.addError(node.fragment, Errors.INVALID_ALIAS_TOKEN_REFERENCE);
  } else {
    project.addError(node.fragment, Errors.UNRESOLVED_IDENTIFIER);
  }
};

/**
 * Consume a child node from the AST on the given parent and optimize the reference pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  const record = node.table.find(node.fragment.data);
  if (!record) {
    project.addError(node.fragment, Errors.UNDEFINED_IDENTIFIER);
  } else {
    switch (state.type) {
      case Symbols.Types.Skip:
        resolveSkip(project, node, record, state);
        break;
      case Symbols.Types.Token:
        resolveToken(project, node, record, state);
        break;
      case Symbols.Types.Node:
        resolveNode(project, direction, parent, record, state);
        break;
      default:
        throw new Exception(`Unsupported state type: ${state.type}`);
    }
  }
};

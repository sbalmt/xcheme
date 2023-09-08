import * as Core from '@xcheme/core';
import * as Parser from '@xcheme/parser';

import * as Records from '../../core/records';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import { Errors } from '../../core/errors';
import { Exception } from '../../core/exception';

import * as Generic from './generic';

/**
 * Resolve the corresponding alias reference for the given node and record.
 * @param project Project context.
 * @param node Reference node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveAliasReference = (
  project: Project.Context,
  node: Types.Node,
  record: Types.SymbolRecord,
  state: Context.State
): void => {
  const identifier = node.fragment.data;
  const { template } = state.record!.data;

  Records.resolve(project, identifier, record, () => {
    if (!template && record.data.template) {
      const reference = Generic.Template.consume(project, node, record, state);
      const identifier = reference.fragment.data;

      record = node.table.find(identifier)!;

      node.swap(reference);
    }

    Records.connect(record, state.record!);
  });
};

/**
 * Resolve the corresponding token reference for the given node as record.
 * @param project Project context.
 * @param node Reference node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveTokenReference = (
  project: Project.Context,
  node: Types.Node,
  record: Types.SymbolRecord,
  state: Context.State
): void => {
  const identifier = node.fragment.data;

  Records.resolve(project, identifier, record, () => {
    if (Records.isDynamic(record)) {
      project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.INVALID_MAP_REFERENCE);
      return;
    }

    Records.connect(record, state.record!);

    Types.assignNode(node, {
      type: Types.Nodes.Reference,
      record
    });
  });
};

/**
 * Resolve and validate the corresponding reference for the specified record and node in a SKIP directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Reference node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveSkip = (
  project: Project.Context,
  node: Types.Node,
  record: Types.SymbolRecord,
  state: Context.State
): void => {
  if (record.value === Parser.Symbols.AliasToken) {
    resolveAliasReference(project, node, record, state);
  } else if (record.value === Parser.Symbols.Token) {
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.INVALID_TOKEN_REFERENCE);
  } else if (record.value === Parser.Symbols.AliasNode) {
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.INVALID_ALIAS_NODE_REFERENCE);
  } else if (record.value === Parser.Symbols.Node) {
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.INVALID_NODE_REFERENCE);
  } else {
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.UNRESOLVED_IDENTIFIER);
  }
};

/**
 * Resolve and validate the corresponding reference for the specified record and node in a TOKEN directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Reference node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveToken = (
  project: Project.Context,
  node: Types.Node,
  record: Types.SymbolRecord,
  state: Context.State
): void => {
  const identifier = node.fragment.data;

  if (record.value === Parser.Symbols.Token) {
    Records.resolve(project, identifier, record, () => Records.connect(record, state.record!));
  } else if (record.value === Parser.Symbols.AliasToken) {
    resolveAliasReference(project, node, record, state);
  } else if (record.value === Parser.Symbols.Node) {
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.INVALID_NODE_REFERENCE);
  } else if (record.value === Parser.Symbols.AliasNode) {
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.INVALID_ALIAS_NODE_REFERENCE);
  } else {
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.UNRESOLVED_IDENTIFIER);
  }
};

/**
 * Resolve and validate the corresponding reference for the specified record and node in a NODE directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param node Reference node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveNode = (
  project: Project.Context,
  node: Types.Node,
  record: Types.SymbolRecord,
  state: Context.State
): void => {
  const identifier = node.fragment.data;

  if (record.value === Parser.Symbols.Node) {
    Records.resolve(project, identifier, record, () => Records.connect(record, state.record!));
  } else if (record.value === Parser.Symbols.AliasNode) {
    resolveAliasReference(project, node, record, state);
  } else if (record.value === Parser.Symbols.Token) {
    resolveTokenReference(project, node, record, state);
  } else if (record.value === Parser.Symbols.AliasToken) {
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.INVALID_ALIAS_TOKEN_REFERENCE);
  } else {
    project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.UNRESOLVED_IDENTIFIER);
  }
};

/**
 * Consume the given node and optimize the REFERENCE pattern.
 * @param project Project context.
 * @param node Reference node.
 * @param state Consumption state.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const identifier = node.fragment.data;
  const record = node.table.find(identifier);

  if (!record) {
    if (!state.record!.table?.find(identifier)) {
      project.logs.emplace(Core.LogType.ERROR, node.fragment, Errors.UNDEFINED_IDENTIFIER);
    }
    return;
  }

  switch (state.type) {
    case Types.Directives.Skip:
      resolveSkip(project, node, record, state);
      break;

    case Types.Directives.Token:
      resolveToken(project, node, record, state);
      break;

    case Types.Directives.Node:
      resolveNode(project, node, record, state);
      break;

    default:
      throw new Exception(`Unsupported state type: ${state.type}`);
  }
};

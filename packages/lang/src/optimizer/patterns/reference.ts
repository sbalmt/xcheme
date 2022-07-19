import * as Parser from '@xcheme/parser';

import * as Records from '../../core/records';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import { Errors } from '../../core/errors';
import { Exception } from '../../core/exception';

import * as Generic from './generic';

/**
 * Process the corresponding template for the given node and record.
 * @param project Project context.
 * @param node Reference node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const template = (project: Project.Context, node: Types.Node, record: Types.Record, state: Context.State): void => {
  let identifier = node.fragment.data;
  const action = () => {
    if (record.data.template) {
      const reference = Generic.Template.consume(project, node, record, state);
      identifier = reference.fragment.data;
      record = node.table.find(identifier)!;
      node.swap(reference);
    }
    Records.resolve(project, identifier, record, () => Records.connect(record, state.record!));
  };
  if (!record.assigned) {
    project.symbols.listen(identifier, action);
  } else {
    action();
  }
};

/**
 * Upgrade the specified node for an optimized one after resolving its reference.
 * @param project Project context.
 * @param node Reference node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const upgrade = (project: Project.Context, node: Types.Node, record: Types.Record, state: Context.State): void => {
  const identifier = node.fragment.data;
  const action = () => {
    if (Records.isDynamic(record)) {
      project.addError(node.fragment, Errors.INVALID_MAP_REFERENCE);
    } else {
      Records.resolve(project, identifier, record, () => Records.connect(record, state.record!));
      Types.assignNode(node, { type: Types.Nodes.Reference, record });
    }
  };
  if (!record.assigned) {
    project.symbols.listen(identifier, action);
  } else {
    action();
  }
};

/**
 * Resolve and validate the corresponding reference for the specified record and node in a SKIP directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Reference node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveSkip = (project: Project.Context, node: Types.Node, record: Types.Record, state: Context.State): void => {
  if (record.value === Parser.Symbols.AliasToken) {
    template(project, node, record, state);
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
 * Resolve and validate the corresponding reference for the specified record and node in a TOKEN directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Reference node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveToken = (project: Project.Context, node: Types.Node, record: Types.Record, state: Context.State): void => {
  const identifier = node.fragment.data;
  if (record.value === Parser.Symbols.Token) {
    Records.resolve(project, identifier, record, () => Records.connect(record, state.record!));
  } else if (record.value === Parser.Symbols.AliasToken) {
    template(project, node, record, state);
  } else if (record.value === Parser.Symbols.Node) {
    project.addError(node.fragment, Errors.INVALID_NODE_REFERENCE);
  } else if (record.value === Parser.Symbols.AliasNode) {
    project.addError(node.fragment, Errors.INVALID_ALIAS_NODE_REFERENCE);
  } else {
    project.addError(node.fragment, Errors.UNRESOLVED_IDENTIFIER);
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
const resolveNode = (project: Project.Context, node: Types.Node, record: Types.Record, state: Context.State): void => {
  const identifier = node.fragment.data;
  if (record.value === Parser.Symbols.Node) {
    Records.resolve(project, identifier, record, () => Records.connect(record, state.record!));
  } else if (record.value === Parser.Symbols.AliasNode) {
    template(project, node, record, state);
  } else if (record.value === Parser.Symbols.Token) {
    upgrade(project, node, record, state);
  } else if (record.value === Parser.Symbols.AliasToken) {
    project.addError(node.fragment, Errors.INVALID_ALIAS_TOKEN_REFERENCE);
  } else {
    project.addError(node.fragment, Errors.UNRESOLVED_IDENTIFIER);
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
    project.addError(node.fragment, Errors.UNDEFINED_IDENTIFIER);
  } else {
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
  }
};

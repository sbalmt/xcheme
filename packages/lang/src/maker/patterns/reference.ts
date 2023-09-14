import * as Parser from '@xcheme/parser';

import * as Coder from '../../core/coder/base';
import * as Nodes from '../../core/nodes';
import * as Records from '../../core/records';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import { Exception } from '../../core/exception';

import * as Node from './node';
import * as Token from './token';

/**
 * Consume the corresponding reference for the specified symbol record.
 * @param project Project context.
 * @param record Symbol record.
 * @param state Consumption state.
 */
const consumeReference = (project: Project.Context, record: Types.SymbolRecord, state: Context.State): void => {
  const directive = record.node!;

  if (!state.context.hasState(directive)) {
    const { type } = record.data;

    if (type === Types.Directives.Node) {
      Node.consume(project, state.context.getState(directive));
    } else if (type === Types.Directives.Token) {
      Token.consume(project, state.context.getState(directive));
    }
  }
};

/**
 * Resolve the corresponding reference for the specified symbol record.
 * @param project Project context.
 * @param record Symbol record.
 * @param state Consumption state.
 * @returns Returns the corresponding reference pattern.
 */
const resolveReference = (
  project: Project.Context,
  record: Types.SymbolRecord,
  state: Context.State
): Coder.Pattern => {
  const reference = project.coder.emitReferencePattern(record);

  if (state.dynamic && !Records.isEmpty(record) && !Records.isDynamic(record)) {
    return project.coder.emitIdentityPattern(record.data.identity, reference);
  }

  return reference;
};

/**
 * Resolve the corresponding reference for the specified record in a SKIP directive.
 * @param project Project context.
 * @param record Target record.
 * @param state Consumption state.
 * @returns Returns the resolved reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveForSkipDirective = (
  project: Project.Context,
  record: Types.SymbolRecord,
  state: Context.State
): Coder.Pattern => {
  if (record.value !== Parser.Symbols.AliasToken) {
    throw new Exception('SKIP directive can only accept ALIAS TOKEN references.');
  }

  return consumeReference(project, record, state), resolveReference(project, record, state);
};

/**
 * Resolve the corresponding reference for the specified record in a TOKEN directive.
 * @param project Project context.
 * @param record Target record.
 * @param state Consumption state.
 * @returns Returns the resolved reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveForTokenDirective = (
  project: Project.Context,
  record: Types.SymbolRecord,
  state: Context.State
): Coder.Pattern => {
  if (record.value !== Parser.Symbols.Token && record.value !== Parser.Symbols.AliasToken) {
    throw new Exception('TOKEN directive can only accept TOKEN and ALIAS TOKEN references.');
  }

  return consumeReference(project, record, state), resolveReference(project, record, state);
};

/**
 * Resolve the corresponding reference for the specified record in a NODE directive.
 * @param project Project context.
 * @param node Reference node.
 * @param record Target record.
 * @param state Consumption state.
 * @returns Returns the resolved reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveForNodeDirective = (
  project: Project.Context,
  node: Types.Node,
  record: Types.SymbolRecord,
  state: Context.State
): Coder.Pattern => {
  if (record.value !== Parser.Symbols.Node && record.value !== Parser.Symbols.AliasNode) {
    if (!node.assigned || !Nodes.hasIdentity(node)) {
      throw new Exception('NODE directive can only accept TOKEN, NODE and ALIAS NODE references.');
    }

    return project.coder.emitExpectUnitsPattern([Nodes.getIdentity(node)]);
  }

  return consumeReference(project, record, state), resolveReference(project, record, state);
};

/**
 * Consume the given node making the REFERENCE pattern.
 * @param project Project context.
 * @param node REFERENCE node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): Coder.Pattern => {
  const identifier = node.fragment.data;
  const record = node.table.find(identifier);

  if (!record) {
    throw new Exception(`Reference node '${identifier}' doesn't exists.`);
  }

  const { type } = Nodes.getRecord(state.directive).data;

  switch (type) {
    case Types.Directives.Skip:
      return resolveForSkipDirective(project, record, state);

    case Types.Directives.Token:
      return resolveForTokenDirective(project, record, state);

    case Types.Directives.Node:
      return resolveForNodeDirective(project, node, record, state);

    default:
      throw new Exception(`Unsupported directive node type (${type}).`);
  }
};

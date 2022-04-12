import * as Coder from '../../core/coder/base';
import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Types from '../../core/types';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Exception } from '../../core/exception';

/**
 * Resolve the corresponding reference for the specified symbol record.
 * @param project Project context.
 * @param record Symbol record.
 * @param state Consumption state.
 * @returns Returns the corresponding reference pattern.
 */
const resolve = (project: Project.Context, record: Types.Record, state: Context.State): Coder.Pattern => {
  const { identity } = record.data;
  const reference = project.coder.emitReferencePattern(record);
  if (state.dynamic && !Symbols.isEmpty(record) && !Symbols.isDynamic(record)) {
    return project.coder.emitIdentityPattern(identity, reference);
  }
  return reference;
};

/**
 * Resolve the corresponding reference for the specified symbol in a SKIP directive.
 * @param project Project context.
 * @param target Target record.
 * @param state Consumption state.
 * @returns Returns the resolved reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveSkip = (project: Project.Context, target: Types.Record, state: Context.State): Coder.Pattern => {
  if (target.value !== Parser.Symbols.AliasToken) {
    throw new Exception('SKIP directive can only accept ALIAS TOKEN references.');
  }
  return resolve(project, target, state);
};

/**
 * Resolve the corresponding reference for the specified record in a TOKEN directive.
 * @param project Project context.
 * @param target Target record.
 * @param state Consumption state.
 * @returns Returns the resolved reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveToken = (project: Project.Context, target: Types.Record, state: Context.State): Coder.Pattern => {
  if (target.value !== Parser.Symbols.Token && target.value !== Parser.Symbols.AliasToken) {
    throw new Exception('TOKEN directive can only accept TOKEN and ALIAS TOKEN references.');
  }
  return resolve(project, target, state);
};

/**
 * Resolve the corresponding reference for the specified record in a NODE directive.
 * @param project Project context.
 * @param node Reference node.
 * @param target Target record.
 * @param state Consumption state.
 * @returns Returns the resolved reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveNode = (
  project: Project.Context,
  node: Types.Node,
  target: Types.Record,
  state: Context.State
): Coder.Pattern => {
  if (target.value !== Parser.Symbols.Node && target.value !== Parser.Symbols.AliasNode) {
    if (!node.assigned || (!node.data.identity && !node.data.record)) {
      throw new Exception('NODE directive can only accept TOKEN, NODE and ALIAS NODE references.');
    }
    return project.coder.emitExpectUnitsPattern([Nodes.getIdentity(node)]);
  }
  return resolve(project, target, state);
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
  const target = node.table.find(identifier);
  if (!target) {
    throw new Exception(`Reference node '${identifier}' doesn't exists.`);
  }
  const { type } = Nodes.getRecord(state.directive).data;
  switch (type) {
    case Types.Directives.Skip:
      return resolveSkip(project, target, state);
    case Types.Directives.Token:
      return resolveToken(project, target, state);
    case Types.Directives.Node:
      return resolveNode(project, node, target, state);
    default:
      throw new Exception(`Unsupported directive type (${type}).`);
  }
};

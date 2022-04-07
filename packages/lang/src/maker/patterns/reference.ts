import * as Nodes from '../../core/nodes';
import * as Coder from '../../core/coder/base';
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
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' directive.
 * @param project Project context.
 * @param record Symbol record.
 * @param state Consumption state.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveSkip = (project: Project.Context, record: Types.Record, state: Context.State): Coder.Pattern => {
  if (record.value !== Parser.Symbols.AliasToken) {
    throw new Exception('The SKIP directive can only accept ALIAS TOKEN references.');
  }
  return resolve(project, record, state);
};

/**
 * Resolve the corresponding reference for the specified record in a 'TOKEN' directive.
 * @param project Project context.
 * @param record Symbol record.
 * @param state Consumption state.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveToken = (project: Project.Context, record: Types.Record, state: Context.State): Coder.Pattern => {
  if (record.value !== Parser.Symbols.Token && record.value !== Parser.Symbols.AliasToken) {
    throw new Exception('The TOKEN directive can only accept TOKEN and ALIAS TOKEN references.');
  }
  return resolve(project, record, state);
};

/**
 * Resolve the corresponding reference for the specified record in a 'NODE' directive.
 * @param project Project context.
 * @param node Reference node.
 * @param record Symbol record.
 * @param state Consumption state.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveNode = (
  project: Project.Context,
  node: Types.Node,
  record: Types.Record,
  state: Context.State
): Coder.Pattern => {
  if (record.value !== Parser.Symbols.Node && record.value !== Parser.Symbols.AliasNode) {
    if (!(node instanceof Nodes.Identity)) {
      throw new Exception('The NODE directive can only accept TOKEN, NODE and ALIAS NODE references.');
    }
    return project.coder.emitExpectUnitsPattern([node.identity]);
  }
  return resolve(project, record, state);
};

/**
 * Consume the given node resolving the reference pattern.
 * @param project Project context.
 * @param node Reference node.
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
  const directive = state.directive;
  switch (directive.type) {
    case Types.Directives.Skip:
      return resolveSkip(project, record, state);
    case Types.Directives.Token:
      return resolveToken(project, record, state);
    case Types.Directives.Node:
      return resolveNode(project, node, record, state);
    default:
      throw new Exception(`Unsupported directive type (${directive.type}).`);
  }
};

import * as Core from '@xcheme/core';

import * as Identified from '../../core/nodes/identified';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Exception } from '../../core/exception';

/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' directive.
 * @param project Project context.
 * @param record Referenced record symbol.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveSkip = (project: Project.Context, record: Core.Record): Coder.Pattern => {
  if (record.value !== Parser.Symbols.AliasToken) {
    throw new Exception('The SKIP directive can only accept alias token references.');
  }
  return project.coder.emitReferencePattern(record);
};

/**
 * Resolve the corresponding reference for the specified record in a 'TOKEN' directive.
 * @param project Project context.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveToken = (project: Project.Context, record: Core.Record): Coder.Pattern => {
  if (record.value !== Parser.Symbols.Token && record.value !== Parser.Symbols.AliasToken) {
    throw new Exception('The TOKEN directive can only accept token and alias token references.');
  }
  return project.coder.emitReferencePattern(record);
};

/**
 * Resolve the corresponding reference for the specified record in a 'NODE' directive.
 * @param project Project context.
 * @param node Reference node.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveNode = (project: Project.Context, node: Core.Node, record: Core.Record): Coder.Pattern => {
  if (record.value !== Parser.Symbols.Node && record.value !== Parser.Symbols.AliasNode) {
    if (!(node instanceof Identified.Node)) {
      throw new Exception('The NODE directive can only accept token, node and alias node references.');
    }
    return project.coder.emitExpectUnitsPattern([node.identity]);
  }
  return project.coder.emitReferencePattern(record);
};

/**
 * Consume the given node resolving the reference pattern.
 * @param project Project context.
 * @param node Reference node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern => {
  const identifier = node.fragment.data;
  const record = node.table.find(identifier);
  if (!record) {
    throw new Exception(`The referenced node (${identifier}) doesn't exists.`);
  }
  const directive = state.directive;
  switch (directive.type) {
    case Symbols.Types.Skip:
      return resolveSkip(project, record);
    case Symbols.Types.Token:
      return resolveToken(project, record);
    case Symbols.Types.Node:
      return resolveNode(project, node, record);
    default:
      throw new Exception(`Unsupported directive type (${directive.type}).`);
  }
};

import * as Core from '@xcheme/core';

import * as Identity from '../../core/nodes/identity';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Referenced record symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project: Project.Context, node: Core.Node, record: Core.Record): Coder.Pattern | undefined => {
  if (record.value === Parser.Symbols.AliasToken) {
    return project.coder.emitReferencePattern(record);
  }
  project.addError(node.fragment, Errors.UNSUPPORTED_NODE);
  return void 0;
};

/**
 * Resolve the corresponding reference for the specified record in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project: Project.Context, node: Core.Node, record: Core.Record): Coder.Pattern | undefined => {
  if (record.value === Parser.Symbols.Token || record.value === Parser.Symbols.AliasToken) {
    return project.coder.emitReferencePattern(record);
  }
  project.addError(node.fragment, Errors.UNSUPPORTED_NODE);
  return void 0;
};

/**
 * Resolve the corresponding reference for the specified record in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param node Input node.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project: Project.Context, node: Core.Node, record: Core.Record): Coder.Pattern | undefined => {
  if (record.value === Parser.Symbols.Node || record.value === Parser.Symbols.AliasNode) {
    return project.coder.emitReferencePattern(record);
  }
  if (node instanceof Identity.Node) {
    return project.coder.emitExpectUnitsPattern([node.identity]);
  }
  project.addError(node.fragment, Errors.UNSUPPORTED_NODE);
  return void 0;
};

/**
 * Consume the given node resolving the reference pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  const identifier = node.fragment.data;
  const record = node.table.find(identifier);
  if (record) {
    const directive = state.directive;
    switch (directive.type) {
      case Symbols.Types.Skip:
        return resolveSkip(project, node, record);
      case Symbols.Types.Token:
        return resolveToken(project, node, record);
      case Symbols.Types.Node:
        return resolveNode(project, node, record);
    }
  }
  project.addError(node.fragment, Errors.UNDEFINED_IDENTIFIER);
  return void 0;
};

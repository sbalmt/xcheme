import * as Core from '@xcheme/core';

import * as Directive from '../../core/nodes/directive';
import * as Identity from '../../core/nodes/identity';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project: Project.Context, node: Core.Node, symbol: Core.Record): Coder.Pattern | undefined => {
  if (symbol.value === Parser.Symbols.Token || symbol.value === Parser.Symbols.AliasToken) {
    const identifier = node.fragment.data;
    const entry = project.tokenEntries.get(identifier);
    if (entry !== void 0) {
      entry.references++;
      return project.coder.emitReferencePattern(project.tokenEntries, identifier);
    }
    project.addError(node, Errors.UNRESOLVED_IDENTIFIER);
  }
  return void 0;
};

/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project: Project.Context, node: Core.Node, symbol: Core.Record): Coder.Pattern | undefined => {
  if (node instanceof Identity.Node) {
    return project.coder.emitExpectUnitsPattern([node.identity]);
  }
  if (symbol.value === Parser.Symbols.Node || symbol.value === Parser.Symbols.AliasNode) {
    const identifier = node.fragment.data;
    const entry = project.nodeEntries.get(identifier);
    if (entry !== void 0) {
      entry.references++;
      return project.coder.emitReferencePattern(project.nodeEntries, identifier);
    }
    project.addError(node, Errors.UNRESOLVED_IDENTIFIER);
  }
  return void 0;
};

/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project: Project.Context, node: Core.Node, symbol: Core.Record): Coder.Pattern | undefined => {
  if (symbol.value === Parser.Symbols.AliasToken) {
    const identifier = node.fragment.data;
    const entry = project.tokenEntries.get(identifier);
    if (entry !== void 0) {
      entry.references++;
      return project.coder.emitReferencePattern(project.tokenEntries, identifier);
    }
    project.addError(node, Errors.UNRESOLVED_IDENTIFIER);
  }
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
  const symbol = node.table.find(identifier);
  if (symbol !== void 0) {
    const directive = state.directive;
    switch (directive.type) {
      case Directive.Types.Token:
        return resolveToken(project, node, symbol);
      case Directive.Types.Node:
        return resolveNode(project, node, symbol);
      case Directive.Types.Skip:
        return resolveSkip(project, node, symbol);
    }
  }
  project.addError(node, Errors.UNDEFINED_IDENTIFIER);
  return void 0;
};

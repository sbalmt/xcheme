import * as Core from '@xcheme/core';

import * as Directive from '../../core/nodes/directive';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Context from '../context';

import { Errors } from '../../core/errors';

import * as Expression from './expression';

/**
 * Emit a new node entry and replace the current node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const replacement = new Directive.Node(node, state.record!);
  parent.setChild(direction, replacement);
  project.symbols.add(state.record!);
};

/**
 * Consume a child node from the AST on the given parent and optimize the 'NODE' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State
): void => {
  const node = parent.getChild(direction)!;
  const identifier = node.fragment.data;
  if (project.symbols.has(identifier)) {
    project.addError(node.fragment, Errors.DUPLICATE_IDENTIFIER);
  } else {
    state.type = Symbols.Types.Node;
    state.record = node.table.get(identifier)!;
    Context.setMetadata(project, identifier, state.record!, state);
    Expression.consume(project, Core.Nodes.Right, node, state);
    emit(project, direction, parent, state);
  }
};

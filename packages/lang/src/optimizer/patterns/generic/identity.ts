import * as Core from '@xcheme/core';

import * as Nodes from '../../../core/nodes';
import * as Project from '../../../core/project';
import * as Symbols from '../../../core/symbols';
import * as Types from '../../../core/types';
import * as Parser from '../../../parser';
import * as Identity from '../../identity';
import * as Context from '../../context';

import * as Expression from '../expression';
import { Errors } from '../../../core/errors';

/**
 * Emit a new identified node replacing the current one for an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param identity Node identity.
 * @param state Consumption state.
 */
const emit = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Types.Node,
  identity: number,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  const record = state.record!;
  const replacement = new Nodes.Identity(node, identity);
  parent.set(direction, replacement);
  if (Symbols.isEmpty(record) && replacement.empty) {
    if (record.data.type !== Types.Directives.Skip) {
      project.addError(state.record!.fragment, Errors.UNDEFINED_IDENTITY);
    }
    project.addError(node.fragment, Errors.UNDEFINED_IDENTITY);
  }
};

/**
 * Consume a child node from the AST on the given parent and optimize the identity pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Types.Node,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  const expression = node.right!;
  if (expression.value === Parser.Nodes.Identity) {
    const identity = Identity.resolve(expression);
    Expression.consume(project, Core.Nodes.Right, expression, state);
    emit(project, direction, parent, identity, state);
  } else {
    Expression.consume(project, Core.Nodes.Right, node, state);
    emit(project, direction, parent, state.identity, state);
  }
};

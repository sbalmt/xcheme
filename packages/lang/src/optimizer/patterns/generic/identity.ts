import * as Core from '@xcheme/core';

import * as Identified from '../../../core/nodes/identified';
import * as Project from '../../../core/project';
import * as Symbols from '../../../core/symbols';
import * as Parser from '../../../parser';
import * as Identity from '../../identity';
import * as Context from '../../context';

import * as Expression from '../expression';
import { Errors } from '../../../core/errors';

/**
 * Emit a new identity node replacing the current basic node.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param identity Node identity.
 * @param state Consumption state.
 */
const emit = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  identity: number,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  const record = state.record!;
  const replacement = new Identified.Node(node, identity);
  parent.set(direction, replacement);
  if (Symbols.isEmpty(record) && replacement.empty) {
    if (record.data.type !== Symbols.Types.Skip) {
      project.addError(state.record!.fragment, Errors.UNDEFINED_IDENTITY);
    }
    project.addError(node.fragment, Errors.UNDEFINED_IDENTITY);
  }
};

/**
 * Consume a child node from the AST on the given parent and optimize the identified pattern.
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
  const node = parent.get(direction)!;
  const expression = node.right!;
  let identity;
  if (expression.value === Parser.Nodes.Identity) {
    identity = Identity.resolve(expression);
    Expression.consume(project, Core.Nodes.Right, expression, state);
  } else {
    identity = state.identity;
    Expression.consume(project, Core.Nodes.Right, node, state);
  }
  emit(project, direction, parent, identity, state);
};

import * as Core from '@xcheme/core';

import * as Parser from '../../parser';
import * as Directive from '../nodes/directive';
import * as Reference from '../reference';
import * as Context from '../context';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';

import * as Expression from './expression';
import * as Range from './range';
import * as String from './string';

/**
 * Assign a new reference to the current consumption state.
 * @param project Input project.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Entry name.
 */
const assign = (project: Project, node: Core.Node, state: Context.State, name: string): void => {
  const current = state.references[name];
  if (current !== void 0) {
    if (current.type !== Reference.Types.Loose) {
      project.errors.push(new Core.Error(node.fragment, Errors.TOKEN_COLLISION));
    }
  } else {
    const identifier = node.fragment.data;
    state.references[identifier] = state.entry;
    state.references[name] = state.entry;
  }
};

/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const expression = node.right!;
  const entry = state.entry;
  const type = state.type;
  state.type = Context.Types.Token;
  entry.identifier = node.fragment.data;
  if (entry.type === Reference.Types.Undefined) {
    entry.type = Reference.Types.User;
  }
  if (expression.value === Parser.Nodes.String) {
    String.consume(project, Core.Nodes.Right, node, state);
    const word = node.right!.fragment.data;
    assign(project, node, state, word);
  } else if (expression.value === Parser.Nodes.Range) {
    Range.consume(project, Core.Nodes.Right, node, state);
    const from = expression.left!.fragment.data;
    const to = expression.right!.fragment.data;
    const range = `${from}-${to}`;
    assign(project, node, state, range);
  } else {
    Expression.consume(project, Core.Nodes.Right, node, state);
    state.references[entry.identifier] = entry;
  }
  parent.setChild(direction, new Directive.Node(node, entry.identity, entry.dynamic, state.alias));
  state.type = type;
};

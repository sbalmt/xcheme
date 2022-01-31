import * as Core from '@xcheme/core';

import * as Directive from '../../core/nodes/directive';
import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Parser from '../../parser';
import * as Context from '../context';
import * as Loose from '../loose';

import * as Expression from './expression';
import * as Range from './range';
import * as String from './string';

/**
 * Emit a new token entry and replace the current token node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const { origin, identifier, identity } = state.entry;
  const node = parent.getChild(direction)!;
  const entry = project.local.create(Entries.Types.Token, origin, identifier, identity, state.entry);
  const replacement = new Directive.Node(node, Directive.Types.Token, entry);
  parent.setChild(direction, replacement);
};

/**
 * Consume a child node from the AST on the given parent and optimize the 'TOKEN' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const expression = node.right!;
  const entry = state.entry;
  entry.type = Entries.Types.Token;
  entry.identifier = node.fragment.data;
  if (expression.value === Parser.Nodes.String) {
    String.consume(project, Core.Nodes.Right, node, state);
    const word = expression.fragment.data;
    if (!Loose.collision(project, expression, word)) {
      emit(project, direction, parent, state);
      project.local.link(word, entry.identifier);
    }
  } else if (expression.value === Parser.Nodes.Range) {
    Range.consume(project, Core.Nodes.Right, node, state);
    const range = `${expression.left!.fragment.data}-${expression.right!.fragment.data}`;
    if (!Loose.collision(project, expression, range)) {
      emit(project, direction, parent, state);
      project.local.link(range, entry.identifier);
    }
  } else {
    Expression.consume(project, Core.Nodes.Right, node, state);
    emit(project, direction, parent, state);
  }
};

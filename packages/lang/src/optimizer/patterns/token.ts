import * as Core from '@xcheme/core';

import * as Directive from '../../core/nodes/directive';
import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

import * as Expression from './expression';
import * as Range from './range';
import * as String from './string';

/**
 * Determines whether or not there are a collision for the given identifier.
 * @param project Project context.
 * @param node Input node.
 * @param identifier Entry identifier.
 * @returns Returns true when the specified identifier already exists, false otherwise.
 */
const collision = (project: Project.Context, node: Core.Node, identifier: string): boolean => {
  const entry = project.tokenEntries.get(identifier);
  if (entry?.origin === Entries.Origins.User) {
    project.addError(node, Errors.TOKEN_COLLISION);
    return true;
  }
  return false;
};

/**
 * Emit a new token entry and replace the current token node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const entry = project.tokenEntries.add(state.entry.origin, state.entry.identifier, state.entry.identity, state.entry);
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
  const type = state.type;
  state.type = Context.Types.Token;
  entry.identifier = node.fragment.data;
  if (expression.value === Parser.Nodes.String) {
    String.consume(project, Core.Nodes.Right, node, state);
    const word = node.right!.fragment.data;
    if (!collision(project, node, word)) {
      emit(project, direction, parent, state);
      project.tokenEntries.link(word, state.entry.identifier);
    }
  } else if (expression.value === Parser.Nodes.Range) {
    Range.consume(project, Core.Nodes.Right, node, state);
    const range = `${expression.left!.fragment.data}-${expression.right!.fragment.data}`;
    if (!collision(project, node, range)) {
      emit(project, direction, parent, state);
      project.tokenEntries.link(range, state.entry.identifier);
    }
  } else {
    Expression.consume(project, Core.Nodes.Right, node, state);
    emit(project, direction, parent, state);
  }
  state.type = type;
};

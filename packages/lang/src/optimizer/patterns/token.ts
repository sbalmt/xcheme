import * as Core from '@xcheme/core';

import * as Parser from '../../parser';
import * as Directive from '../nodes/directive';
import * as Context from '../context';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';

import * as Entries from '../../core/entries';

import * as Expression from './expression';
import * as Range from './range';
import * as String from './string';

/**
 * Assign a new reference to the current consumption state.
 * @param project Input project.
 * @param node Input node.
 * @param state Consumption state.
 * @param link Entry link name.
 */
const assign = (project: Project, node: Core.Node, state: Context.State, link: string): void => {
  const current = project.tokenEntries.get(link);
  if (current !== void 0) {
    if (current.origin !== Entries.Origins.Loose) {
      project.errors.push(new Core.Error(node.fragment, Errors.TOKEN_COLLISION));
    }
  } else {
    const entry = state.entry;
    project.tokenEntries.add(entry.type, entry.origin, entry.identifier, entry.identity, entry.dynamic);
    project.tokenEntries.link(link, entry.identifier);
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
  if (entry.origin === Entries.Origins.Undefined) {
    entry.origin = Entries.Origins.User;
  }
  if (expression.value === Parser.Nodes.String) {
    String.consume(project, Core.Nodes.Right, node, state);
    const word = node.right!.fragment.data;
    assign(project, node, state, word);
  } else if (expression.value === Parser.Nodes.Range) {
    Range.consume(project, Core.Nodes.Right, node, state);
    const range = `${expression.left!.fragment.data}-${expression.right!.fragment.data}`;
    assign(project, node, state, range);
  } else {
    Expression.consume(project, Core.Nodes.Right, node, state);
    project.tokenEntries.add(entry.type, entry.origin, entry.identifier, entry.identity, entry.dynamic);
  }
  parent.setChild(direction, new Directive.Node(node, entry));
  state.type = type;
};

import * as Core from '@xcheme/core';

import * as Directive from '../../core/nodes/directive';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Emit a new skip entry and replace the current skip node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.get(direction)!;
  const replacement = new Directive.Node(node, state.record!);
  parent.set(direction, replacement);
  project.symbols.add(state.record!);
};

/**
 * Consume a child node from the AST on the given parent and optimize the 'SKIP' directive.
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
  const identifier = `@SKIP${state.identity}`;
  const line = new Core.Range(0, 0);
  const column = new Core.Range(0, identifier.length);
  const location = new Core.Location(project.name, line, column);
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  const record = new Core.Record(fragment, Parser.Symbols.Skip, node);
  state.type = Symbols.Types.Skip;
  state.record = node.table.add(record);
  Context.setMetadata(project, identifier, state.record!, state);
  Expression.consume(project, Core.Nodes.Right, node, state);
  emit(project, direction, parent, state);
};

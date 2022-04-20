import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Counter from '../../core/counter';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Global identity counter for SKIP directives.
 */
const counter = new Counter.Context();

/**
 * Assign the corresponding metadata to the given node and record.
 * @param project Project context.
 * @param node Input node.
 * @param record Input record.
 * @param state Consumption state.
 */
const assign = (project: Project.Context, node: Types.Node, record: Types.Record, state: Context.State): void => {
  state.type = Types.Directives.Skip;
  state.record = record;
  Types.assignRecord(project, record, {
    type: state.type,
    origin: state.origin,
    identifier: record.fragment.data,
    identity: NaN,
    template: false
  });
  Types.assignNode(node, {
    type: Types.Nodes.Directive,
    record
  });
};

/**
 * Register a new symbol record for the given SKIP directive.
 * @param project Project context.
 * @param node Directive node.
 * @param identifier Directive identifier.
 * @returns Returns the registered symbol record.
 */
const register = (project: Project.Context, node: Types.Node, identifier: string): Types.Record => {
  const line = new Core.Range(0, 0);
  const column = new Core.Range(0, identifier.length);
  const location = new Core.Location(project.name, line, column);
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  const record = new Core.Record(fragment, Parser.Symbols.Skip, node);
  return node.table.add(record);
};

/**
 * Consume the given node and optimize its SKIP directive.
 * @param project Project context.
 * @param node Directive node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const identifier = `@SKIP${counter.increment(project)}`;
  const record = register(project, node, identifier);
  assign(project, node, record, state);
  Expression.consume(project, node.right!, state);
  project.symbols.add(record);
};

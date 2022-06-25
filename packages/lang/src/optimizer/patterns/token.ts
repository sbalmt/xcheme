import * as Parser from '@xcheme/parser';

import * as Records from '../../core/records';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Identity from '../identity';
import * as Context from '../context';
import * as Loose from '../loose';

import { Errors } from '../../core/errors';

import * as Expression from './expression';

/**
 * Assign the corresponding metadata to the given node and record.
 * @param project Project context.
 * @param node Input node.
 * @param record Input record.
 * @param state Consumption state.
 */
const assign = (project: Project.Context, node: Types.Node, record: Types.Record, state: Context.State): void => {
  const template = Records.isTemplate(record);
  state.type = Types.Directives.Token;
  state.record = record;
  Types.assignRecord(project, record, {
    type: state.type,
    origin: state.origin,
    identity: Identity.consume(project, node.left, template),
    identifier: node.fragment.data,
    template
  });
  Types.assignNode(node, {
    type: Types.Nodes.Directive,
    record
  });
};

/**
 * Link the specified node to the given identifier for avoiding token collisions.
 * @param project Project context.
 * @param node Expression node.
 * @param identifier Token identifier.
 */
const link = (project: Project.Context, node: Types.Node, identifier: string): void => {
  if (node.value === Parser.Nodes.String) {
    const word = node.fragment.data;
    if (!Loose.collision(project, word, node)) {
      project.symbols.link(word, identifier);
    }
  } else if (node.value === Parser.Nodes.Range) {
    const range = `${node.left!.fragment.data}-${node.right!.fragment.data}`;
    if (!Loose.collision(project, range, node)) {
      project.symbols.link(range, identifier);
    }
  }
};

/**
 * Consume the given node and optimize its TOKEN directive.
 * @param project Project context.
 * @param node Directive node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const identifier = node.fragment.data;
  if (project.symbols.has(identifier)) {
    project.addError(node.fragment, Errors.DUPLICATE_IDENTIFIER);
  } else {
    const record = node.table.get(identifier)!;
    assign(project, node, record, state);
    if (!Records.isAlias(record) && Records.isEmpty(record)) {
      project.addError(node.fragment, Errors.UNDEFINED_IDENTITY);
    } else {
      project.symbols.add(record);
      if (!record.data.template) {
        const expression = node.right!;
        Expression.consume(project, expression, state);
        link(project, expression, identifier);
      }
    }
  }
};

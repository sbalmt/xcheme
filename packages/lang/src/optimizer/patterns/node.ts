import * as Records from '../../core/records';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Identity from '../identity';
import * as Context from '../context';

import { Errors } from '../../core/errors';

import * as Expression from './expression';

/**
 * Assign the corresponding metadata to the given node and record.
 * @param project Project context.
 * @param node Input node.
 * @param record Input record.
 * @param state Consumption state.
 */
const assign = (project: Project.Context, node: Types.Node, record: Types.SymbolRecord, state: Context.State): void => {
  const template = Records.isTemplate(record);
  state.type = Types.Directives.Node;
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
 * Consume the given node and optimize its NODE directive.
 * @param project Project context.
 * @param node Directive node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const identifier = node.fragment.data;
  if (project.symbols.has(identifier)) {
    project.errors.emplace(node.fragment, Errors.DUPLICATE_IDENTIFIER);
  } else {
    const record = node.table.get(identifier)!;
    assign(project, node, record, state);
    if (!Records.isAlias(record) && Records.isEmpty(record)) {
      project.errors.emplace(node.fragment, Errors.UNDEFINED_IDENTITY);
    } else {
      project.symbols.add(record);
      if (!record.data.template) {
        Expression.consume(project, node.right!, state);
      }
    }
  }
};

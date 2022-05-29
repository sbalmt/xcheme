import * as Core from '@xcheme/core';

import * as Records from '../../core/records';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Parser from '../../parser';
import * as Identity from '../identity';
import * as Context from '../context';
import * as Loose from '../loose';

import { Errors } from '../../core/errors';

import * as Expression from './expression';

/**
 * Determines whether or not the given node is routable.
 * @param node Route node.
 * @returns Returns true when the node is routable, false otherwise.
 */
const isRoutable = (node: Types.Node): boolean => {
  return (
    node.value === Parser.Nodes.String ||
    (node.assigned && (node.data.record !== void 0 || node.data.sequence !== void 0))
  );
};

/**
 * Get the corresponding route from the child node in the given parent.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @returns Returns the corresponding route or undefined when there's no route.
 */
const getRoute = (direction: Core.Nodes, parent: Types.Node): Types.Node | undefined => {
  const action = (
    direction: Core.Nodes,
    parent: Types.Node,
    ancestor?: { direction: Core.Nodes; parent: Types.Node }
  ): Types.Node | undefined => {
    const node = parent.get(direction)!;
    if (node.value !== Parser.Nodes.Then && node.value !== Parser.Nodes.Or) {
      if (isRoutable(node)) {
        if (ancestor && parent) {
          ancestor.parent.set(ancestor.direction!, parent.right);
        }
        return node;
      }
      if (node.left) {
        return action(Core.Nodes.Left, node, { direction, parent });
      }
    }
    return void 0;
  };
  return action(direction, parent);
};

/**
 * Assign to the given node its corresponding route and identity.
 * @param project Project context.
 * @param entry Entry node.
 * @param member Entry member node.
 * @param identity Route identity.
 */
const assignRoute = (project: Project.Context, entry: Types.Node, member: Types.Node, identity: number): void => {
  const route = getRoute(Core.Nodes.Right, member);
  if (!route) {
    project.addError(entry.fragment, Errors.INVALID_MAP_ENTRY);
  } else {
    if (route.value === Parser.Nodes.String) {
      Loose.collision(project, route.fragment.data, route);
    }
    Types.assignNode(entry, {
      type: Types.Nodes.MemberRoute,
      identity: identity,
      route
    });
  }
};

/**
 * Consume the given node and optimize its anonymous ENTRY pattern.
 * @param project Project context.
 * @param entry Entry node.
 * @param state Consumption state.
 */
const consumeAnonymous = (project: Project.Context, entry: Types.Node, state: Context.State): void => {
  const member = entry.right!;
  if (member.value === Parser.Nodes.Arguments) {
    const template = state.record!.data.template;
    const identity = Identity.consume(project, member, template, () =>
      Project.Context.identity.increment(project.coder, project.options.identity)
    );
    Expression.consume(project, member.right!, state);
    assignRoute(project, entry, member, identity);
  } else {
    const identity = Records.isDynamic(state.record!)
      ? Project.Context.identity.increment(project.coder, project.options.identity)
      : Core.Source.Output;
    Expression.consume(project, member, state);
    assignRoute(project, entry, entry, identity);
  }
};

/**
 * Consume the given node and optimize its identifiable ENTRY pattern
 * @param project Project context.
 * @param entry Entry node.
 * @param state Consumption state.
 */
const consumeIdentifiable = (project: Project.Context, entry: Types.Node, state: Context.State): void => {
  const member = entry.right!;
  const identifier = `${state.record!.data.identifier}@${member.fragment.data}`;
  if (project.symbols.has(identifier)) {
    project.addError(member.fragment, Errors.DUPLICATE_IDENTIFIER);
  } else {
    const previousRecord = state.record!;
    const template = previousRecord.data.template;
    const identity = Identity.consume(project, member.left, template, () =>
      Project.Context.identity.increment(project.coder, project.options.identity)
    );
    state.record = entry.table.get(member.fragment.data)!;
    Types.assignRecord(project, state.record, {
      type: state.type,
      origin: state.origin,
      identity,
      identifier,
      template
    });
    Records.connect(project, identifier, state.record, previousRecord);
    project.symbols.add(state.record);
    Expression.consume(project, member.right!, state);
    assignRoute(project, entry, member, identity);
    state.record = previousRecord;
  }
};

/**
 * Consume the given node and optimize its MAP pattern.
 * @param project Project context.
 * @param node Map node.
 * @param state Context state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const record = state.record!;
  let entry = node.right;
  let error = false;
  while (entry) {
    const member = entry.right!;
    if (member.value !== Parser.Nodes.Identifier) {
      if (member.value !== Parser.Nodes.Arguments && Records.isDynamic(record)) {
        project.addError(member.fragment, Errors.UNDEFINED_IDENTITY);
      }
      consumeAnonymous(project, entry, state);
    } else {
      if (state.type === Types.Directives.Skip) {
        project.addError(member.fragment, Errors.UNSUPPORTED_IDENTITY);
      } else if (!Records.isDynamic(record) && !Records.hasIdentity(record)) {
        if (!error) {
          project.addError(record.fragment, Errors.UNDEFINED_IDENTITY);
          error = true;
        }
        project.addError(member.fragment, Errors.UNSUPPORTED_IDENTITY);
      }
      consumeIdentifiable(project, entry, state);
    }
    entry = entry.next!;
  }
};

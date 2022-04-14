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
 * Get the corresponding route from a child node in the given parent.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param ancestor Ancestor node.
 * @returns Returns the corresponding route or undefined when there's no route.
 */
const getRoute = (direction: Core.Nodes, parent: Types.Node, ancestor?: Context.Node): Types.Node | undefined => {
  const node = parent.get(direction)!;
  if (node.value !== Parser.Nodes.Then && node.value !== Parser.Nodes.Or) {
    if (
      node.value === Parser.Nodes.String ||
      (node.assigned && (node.data.record !== void 0 || node.data.sequence !== void 0))
    ) {
      if (ancestor && parent) {
        ancestor.parent.set(ancestor.direction!, parent.right);
      }
      return node;
    }
    if (node.left) {
      return getRoute(Core.Nodes.Left, node, { direction, parent });
    }
  }
  return void 0;
};

/**
 * Emit an optimized member node replacing the current child node from the given parent.
 * @param project Project context.
 * @param entry Entry node.
 * @param member Entry member node.
 * @param identity Member identity.
 * @returns Returns true when the member node was emitted, false otherwise.
 */
const emit = (project: Project.Context, entry: Types.Node, member: Types.Node, identity: number): boolean => {
  const route = getRoute(Core.Nodes.Right, member);
  if (route) {
    if (route.value === Parser.Nodes.String) {
      Loose.collision(project, route.fragment.data, route);
    }
    Types.assignNode(entry, {
      type: Types.Nodes.MemberRoute,
      identity: identity,
      route: route
    });
    return true;
  }
  project.addError(entry.fragment, Errors.INVALID_MAP_ENTRY);
  return false;
};

/**
 * Consume the given node and optimize the MAP pattern.
 * @param project Project context.
 * @param node Map node.
 * @param state Context state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  let entry = node.right;
  const record = state.record!;
  const dynamic = Records.isDynamic(record);
  while (entry) {
    const member = entry.right!;
    if (member.value !== Parser.Nodes.Identifier) {
      const identity = dynamic
        ? Project.Context.identity.increment(project.coder, project.options.identity)
        : Core.Source.Output;
      Expression.consume(project, member, state);
      emit(project, entry, entry, identity);
    } else {
      if (state.type === Types.Directives.Skip) {
        project.addError(member.fragment, Errors.UNSUPPORTED_IDENTITY);
        break;
      }
      if (!dynamic && !Records.isAlias(record)) {
        project.addError(record.fragment, Errors.UNDEFINED_AUTO_IDENTITY);
        project.addError(member.fragment, Errors.UNSUPPORTED_IDENTITY);
        break;
      }
      const identifier = `${record!.data.identifier}@${member.fragment.data}`;
      if (project.symbols.has(identifier)) {
        project.addError(member.fragment, Errors.DUPLICATE_IDENTIFIER);
      } else {
        const identity = state.identity;
        state.identity = Identity.consume(project, member.left, state);
        state.record = entry.table.get(member.fragment.data)!;
        Context.setMetadata(project, identifier, state.record!, state);
        Records.connect(project, identifier, state.record!, record);
        Expression.consume(project, member.right!, state);
        if (emit(project, entry, member, state.identity)) {
          project.symbols.add(state.record);
        }
        state.identity = identity;
        state.record = record;
      }
    }
    entry = entry.next!;
  }
};

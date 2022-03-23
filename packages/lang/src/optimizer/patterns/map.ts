import * as Core from '@xcheme/core';

import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Parser from '../../parser';
import * as Identity from '../identity';
import * as Context from '../context';
import * as Loose from '../loose';

import { Errors } from '../../core/errors';

import * as Expression from './expression';

/**
 * Get the route node based on the given expression node.
 * @param node Expression node.
 * @param parent Expression parent node.
 * @returns Returns the route node or undefined when there's no route.
 */
const getRoute = (node: Core.Node, parent?: Core.Node): Core.Node | undefined => {
  if (node.value !== Parser.Nodes.Then && node.value !== Parser.Nodes.Or) {
    if (node.value === Parser.Nodes.String || node instanceof Nodes.Identity || node instanceof Nodes.Sequence) {
      if (parent) {
        const right = parent.right!;
        parent.set(Core.Nodes.Left, void 0);
        parent.set(Core.Nodes.Right, void 0);
        parent.swap(right);
      }
      return node;
    }
    if (node.left) {
      return getRoute(node.left, node);
    }
  }
  return void 0;
};

/**
 * Emit a new member node replacing the current one for an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param identity Node identity.
 * @param node Expression node.
 * @returns Returns true when the member node was emitted, false otherwise.
 */
const emit = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  identity: number,
  node: Core.Node
): boolean => {
  const route = getRoute(node);
  if (!route) {
    project.addError(parent.fragment, Errors.INVALID_MAP_ENTRY);
    return false;
  }
  if (route.value === Parser.Nodes.String) {
    Loose.collision(project, route.fragment.data, route);
  }
  const replacement = new Nodes.Member(node, identity, route);
  parent.set(direction, replacement);
  return true;
};

/**
 * Consume a child node from the AST on the given parent and optimize the map pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State
): void => {
  let entry = parent.get(direction)!.right;
  const record = state.record!;
  const dynamic = Symbols.isDynamic(record);
  while (entry) {
    const member = entry.right!;
    if (member.value !== Parser.Nodes.Identifier) {
      const identity = dynamic
        ? Project.Context.identity.increment(project.coder, project.options.identity)
        : Core.BaseSource.Output;
      Expression.consume(project, Core.Nodes.Right, entry, state);
      emit(project, Core.Nodes.Right, entry, identity, entry.right!);
    } else {
      if (state.type === Symbols.Types.Skip) {
        project.addError(member.fragment, Errors.UNSUPPORTED_IDENTITY);
        break;
      }
      if (!dynamic && !Symbols.isAlias(record)) {
        project.addError(record.fragment, Errors.UNDEFINED_AUTO_IDENTITY);
        project.addError(member.fragment, Errors.UNSUPPORTED_IDENTITY);
        break;
      }
      const identifier = `${record!.data.identifier}@${member.fragment.data}`;
      if (project.symbols.has(identifier)) {
        project.addError(member.fragment, Errors.DUPLICATE_IDENTIFIER);
      } else {
        const identity = state.identity;
        state.identity = Identity.consume(member);
        state.record = entry.table.get(member.fragment.data)!;
        Context.setMetadata(project, identifier, state.record!, state);
        record.data.dependencies.push(state.record);
        state.record.data.dependents.push(record);
        Expression.consume(project, Core.Nodes.Right, member, state);
        if (emit(project, Core.Nodes.Right, entry, state.identity, member.right!)) {
          project.symbols.add(state.record);
        }
        state.identity = identity;
        state.record = record;
      }
    }
    entry = entry.next!;
  }
};

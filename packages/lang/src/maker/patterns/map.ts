import * as Core from '@xcheme/core';

import * as Nodes from '../../core/nodes';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as String from '../../core/string';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Exception } from '../../core/exception';

import * as Expression from './expression';

/**
 * Resolve all units for the given map entry node.
 * @param node Map entry node.
 * @returns Returns an array containing all the entry units.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveUnits = (node: Core.Node): (string | number)[] => {
  if (node.value === Parser.Nodes.String) {
    return String.extract(node.fragment.data).split('');
  } else if (node instanceof Nodes.Identity) {
    return [node.identity];
  } else if (node instanceof Nodes.Sequence) {
    if (node.type !== Parser.Nodes.String) {
      return node.sequence.map((node) => (node as Nodes.Identity).identity);
    }
    const data = node.sequence.map((node) => String.extract(node.fragment.data));
    return data.join('').split('');
  } else {
    throw new Exception('MAP entries must be instance of sequential or identified nodes.');
  }
};

/**
 * Resolve the corresponding route for the given map entry member.
 * @param project Project context.
 * @param map Map directive.
 * @param member Map entry member.
 * @param state Consumption state.
 * @param units Route units.
 * @returns Returns the resolved route.
 */
const resolveRoute = (
  project: Project.Context,
  map: Nodes.Directive,
  member: Nodes.Member,
  state: Context.State,
  units: (string | number)[]
): Coder.Route => {
  if (!member.empty) {
    const current = state.dynamic;
    state.dynamic = member.dynamic;
    const pattern = Expression.consume(project, member, state);
    state.dynamic = current;
    if (member.dynamic || map.type === Symbols.Types.Skip) {
      return project.coder.getRoute(units, void 0, pattern);
    }
    return project.coder.getRoute(units, member.identity, pattern);
  }
  if (member.dynamic || map.type === Symbols.Types.Skip) {
    return project.coder.getRoute(units, void 0);
  }
  return project.coder.getRoute(units, member.identity);
};

/**
 * Consume the given node resolving the 'MAP' pattern.
 * @param project Project context.
 * @param node Map node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern or undefined when the map node has no entry members.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  let entry = node.right!;
  const directive = state.directive;
  const routes = [];
  while (entry) {
    const member = entry.right!;
    if (!(member instanceof Nodes.Member)) {
      throw new Exception('The MAP entry node must be an instance of a member node.');
    }
    const units = resolveUnits(member.route);
    const route = resolveRoute(project, directive, member, state, units);
    routes.push(route);
    entry = entry.next!;
  }
  if (routes.length > 0) {
    return project.coder.emitMapPattern(...routes);
  }
  return void 0;
};

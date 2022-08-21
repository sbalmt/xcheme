import * as Core from '@xcheme/core';
import * as Parser from '@xcheme/parser';

import * as Coder from '../../core/coder/base';
import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as String from '../../core/string';
import * as Context from '../context';

import { Exception } from '../../core/exception';

import * as Expression from './expression';

/**
 * Resolve the route expression according to the given route node.
 * @param route Route node.
 * @returns Returns the route expression.
 */
const resolveExpression = (route: Types.Node): Types.Node => {
  const expression = route.next ?? route;
  if (expression.value === Parser.Nodes.Identifier || expression.value === Parser.Nodes.Arguments) {
    return expression.right!;
  }
  return expression;
};

/**
 * Resolve all units for the given map entry node.
 * @param node Map entry node.
 * @returns Returns an array containing all entry units.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveUnits = (node: Types.Node): (string | number)[] => {
  if (node.value === Parser.Nodes.String) {
    return String.extract(node.fragment.data).split('');
  } else if (node.value === Parser.Nodes.Access) {
    return [Nodes.getIdentity(node.lowest(Core.NodeDirection.Right)!)];
  } else if (node.value === Parser.Nodes.Reference) {
    return [Nodes.getIdentity(node)];
  } else if (node.value === Parser.Nodes.And) {
    if (node.data.type === Types.Nodes.ReferenceSequence) {
      return node.data.sequence!.map(Nodes.getIdentity);
    }
    const data = node.data.sequence!.map((node) => String.extract(node.fragment.data));
    return data.join('').split('');
  } else {
    throw new Exception('MAP entries must be instance of sequential or identified nodes.');
  }
};

/**
 * Resolve the corresponding route for the given map entry node.
 * @param project Project context.
 * @param type Directive type.
 * @param entry Map entry node.
 * @param state Consumption state.
 * @returns Returns the resolved route.
 */
const resolveRoute = (
  project: Project.Context,
  type: Types.Directives,
  entry: Types.Node,
  state: Context.State
): Coder.Route => {
  const { route, identity } = entry.data;
  const dynamic = Nodes.isDynamic(entry);
  const expression = resolveExpression(route!.next ?? route!);
  const units = resolveUnits(route!);
  if (route !== expression) {
    const current = state.dynamic;
    state.dynamic = dynamic;
    const pattern = Expression.consume(project, expression, state);
    state.dynamic = current;
    if (dynamic || type === Types.Directives.Skip) {
      return project.coder.getRoute(units, void 0, pattern);
    }
    return project.coder.getRoute(units, identity, pattern);
  }
  if (dynamic || type === Types.Directives.Skip) {
    return project.coder.getRoute(units, void 0);
  }
  return project.coder.getRoute(units, identity);
};

/**
 * Consume the given node making the MAP pattern.
 * @param project Project context.
 * @param node MAP node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern or undefined when the map node has no entry members.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State
): Coder.Pattern | undefined => {
  const { type } = Nodes.getRecord(state.directive).data;
  const routes = [];
  let entry = node.right!;
  while (entry) {
    if (!entry.assigned || !entry.data.route) {
      throw new Exception('The MAP entry node must be an assigned node.');
    }
    const route = resolveRoute(project, type, entry, state);
    routes.push(route);
    entry = entry.next!;
  }
  if (routes.length > 0) {
    return project.coder.emitMapPattern(...routes);
  }
  return void 0;
};

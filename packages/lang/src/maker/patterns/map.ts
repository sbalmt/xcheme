import * as Core from '@xcheme/core';

import * as Directive from '../../core/nodes/directive';
import * as Sequential from '../../core/nodes/sequential';
import * as Identified from '../../core/nodes/identified';
import * as Member from '../../core/nodes/member';
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
  }
  if (node instanceof Identified.Node) {
    return [node.identity];
  }
  if (!(node instanceof Sequential.Node)) {
    throw new Exception('Unable to resolve the units for the map entry node.');
  }
  if (node.type !== Parser.Nodes.String) {
    return node.sequence.map((node) => (node as Identified.Node).identity);
  }
  const words = node.sequence.map((node) => String.extract(node.fragment.data));
  return words.join('').split('');
};

/**
 * Resolve the corresponding route for the given map entry member.
 * @param project Project context.
 * @param map Map directive.
 * @param entry Map entry member.
 * @param state Consumption state.
 * @param units Route units.
 * @returns Returns the resolved route.
 */
const resolveRoute = (
  project: Project.Context,
  map: Directive.Node,
  entry: Member.Node,
  state: Context.State,
  units: (string | number)[]
): Coder.Route => {
  if (!entry.empty) {
    const pattern = Expression.consume(project, entry, state);
    if (entry.dynamic || map.type === Symbols.Types.Skip) {
      return project.coder.getRoute(units, void 0, pattern);
    }
    return project.coder.getRoute(units, entry.identity, pattern);
  }
  if (map.type === Symbols.Types.Skip) {
    return project.coder.getRoute(units, void 0);
  }
  return project.coder.getRoute(units, entry.identity);
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
  let member = node.right!;
  const directive = state.directive;
  const routes = [];
  while (member) {
    const current = member.right!;
    if (!(current instanceof Member.Node)) {
      throw new Exception('Map entry nodes must be instances of member nodes.');
    }
    const units = resolveUnits(current.route);
    const route = resolveRoute(project, directive, current, state, units);
    routes.push(route);
    member = member.next!;
  }
  if (routes.length > 0) {
    return project.coder.emitMapPattern(...routes);
  }
  return void 0;
};

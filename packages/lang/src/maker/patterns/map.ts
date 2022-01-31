import * as Core from '@xcheme/core';

import * as Mergeable from '../../core/nodes/mergeable';
import * as Directive from '../../core/nodes/directive';
import * as Identity from '../../core/nodes/identity';
import * as Member from '../../core/nodes/member';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as String from '../../core/string';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

import * as Expression from './expression';

/**
 * Resolve all units for the given entry node.
 * @param node Entry node.
 * @returns Returns the units array or undefined when the given entry isn't supported.
 */
const resolve = (node: Core.Node): (string | number)[] | undefined => {
  if (node.value === Parser.Nodes.String) {
    return String.extract(node.fragment.data).split('');
  } else if (node instanceof Identity.Node) {
    return [node.identity];
  } else if (node instanceof Mergeable.Node) {
    if (node.type !== Parser.Nodes.String) {
      return node.sequence.map((node) => (node as Identity.Node).identity);
    }
    return node.sequence
      .map((node) => String.extract(node.fragment.data))
      .join('')
      .split('');
  }
  return void 0;
};

/**
 * Consume the given node resolving the 'MAP' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  let member = node.right!;
  const directive = state.directive;
  const routes = [];
  while (member) {
    const current = member.right!;
    if (!(current instanceof Member.Node)) {
      project.addError(node, Errors.UNSUPPORTED_NODE);
    } else {
      const units = resolve(current.route);
      if (!units) {
        project.addError(node, Errors.UNEXPECTED_NODE);
      } else {
        let route;
        if (!current.empty) {
          const pattern = Expression.consume(project, current!, state);
          if (current.dynamic || directive.type === Directive.Types.Skip) {
            route = project.coder.getRoute(units, void 0, pattern);
          } else {
            route = project.coder.getRoute(units, current.identity, pattern);
          }
        } else if (directive.type === Directive.Types.Skip) {
          route = project.coder.getRoute(units, void 0);
        } else {
          route = project.coder.getRoute(units, current.identity);
        }
        routes.push(route);
      }
    }
    member = member.next!;
  }
  if (routes.length > 0) {
    return project.coder.emitMapPattern(...routes);
  }
  return void 0;
};

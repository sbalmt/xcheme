import * as Core from '@xcheme/core';

import * as String from '../../core/string';
import * as Mergeable from '../../optimizer/nodes/mergeable';
import * as Identity from '../../optimizer/nodes/identity';
import * as Member from '../../optimizer/nodes/member';
import * as Parser from '../../parser';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';
import { State, Types } from '../context';

import type { PatternEntry } from '../coder/base';

import * as Expression from './expression';

/**
 * Resolve all units for the given entry node.
 * @param entry Entry node.
 * @returns Returns the units array or undefined when the given entry isn't supported.
 */
const resolve = (entry: Core.Node): (string | number)[] | undefined => {
  if (entry.value === Parser.Nodes.String) {
    return String.extract(entry.fragment.data).split('');
  } else if (entry instanceof Identity.Node) {
    return [entry.identity];
  } else if (entry instanceof Mergeable.Node) {
    if (entry.type !== Parser.Nodes.String) {
      return entry.sequence.map((node) => (node as Identity.Node).identity);
    }
    return entry.sequence
      .map((node) => String.extract(node.fragment.data))
      .join('')
      .split('');
  }
  return void 0;
};

/**
 * Consume the specified input node resolving its 'MAP' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  let member = node.right!;
  const routes = [];
  while (member !== void 0) {
    const current = member.right!;
    if (!(current instanceof Member.Node)) {
      project.errors.push(new Core.Error(node.fragment, Errors.UNSUPPORTED_NODE));
    } else {
      const entry = current.entry;
      const units = resolve(entry);
      if (units === void 0) {
        project.errors.push(new Core.Error(node.fragment, Errors.UNEXPECTED_NODE));
      } else {
        let route;
        if (current.right !== void 0 && current.right !== entry.right) {
          const pattern = Expression.consume(project, current.right!, state);
          if (current.dynamic || state.type === Types.Skip) {
            route = project.coder.getRoute(units, void 0, pattern);
          } else {
            route = project.coder.getRoute(units, current.identity, pattern);
          }
        } else if (state.type === Types.Skip) {
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

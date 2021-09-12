import * as Core from '@xcheme/core';

import * as String from '../../core/string';
import * as Mergeable from '../../optimizer/nodes/mergeable';
import * as Identity from '../../optimizer/nodes/identity';
import * as Parser from '../../parser';

import { Project } from '../../core/project';
import { State } from '../context';

import type { PatternEntry } from '../coder/base';

import * as Expression from './expression';

/**
 * Resolve the specified input node as an 'OR' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
export const resolve = (project: Project, node: Core.Node, state: State): PatternEntry[] | undefined => {
  if (node.value !== Parser.Nodes.Or) {
    const pattern = Expression.consume(project, node, state);
    if (pattern !== void 0) {
      return [pattern];
    }
  } else if (node instanceof Mergeable.Node) {
    if (node.type === Parser.Nodes.String) {
      const fragments = node.sequence.map((node) => String.extract(node.fragment.data));
      if (fragments.length > 3 || fragments.find((fragment) => fragment.length > 1) !== void 0) {
        const routes = fragments.map((fragment) => project.coder.getRoute(fragment.split('')));
        return [project.coder.emitMapPattern(...routes)];
      }
      return [project.coder.emitChooseUnitsPattern(fragments)];
    } else {
      const units = node.sequence.map((node) => (node as Identity.Node).identity);
      if (units.length > 3) {
        const routes = units.map((unit) => project.coder.getRoute([unit]));
        return [project.coder.emitMapPattern(...routes)];
      }
      return [project.coder.emitChooseUnitsPattern(units)];
    }
  } else {
    const left = resolve(project, node.left!, state);
    if (left !== void 0) {
      const right = resolve(project, node.right!, state);
      if (right !== void 0) {
        return [...left, ...right];
      }
    }
  }
  return void 0;
};

/**
 * Consume the specified input node resolving its 'OR' rule.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the rule is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const patterns = resolve(project, node, state);
  if (patterns !== void 0) {
    if (patterns.length > 1) {
      return project.coder.emitChoosePattern(...patterns);
    }
    return patterns[0];
  }
  return void 0;
};

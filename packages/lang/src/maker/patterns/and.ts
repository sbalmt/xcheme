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
 * Resolve the specified input node as an 'AND' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
export const resolve = (project: Project, node: Core.Node, state: State): PatternEntry[] | undefined => {
  if (node.value !== Parser.Nodes.And) {
    const pattern = Expression.consume(project, node, state);
    if (pattern !== void 0) {
      return [pattern];
    }
  } else if (node instanceof Mergeable.Node) {
    let units;
    if (node.type === Parser.Nodes.String) {
      const words = node.sequence.map((node) => String.extract(node.fragment.data));
      units = words.join('').split('');
    } else {
      units = node.sequence.map((node) => (node as Identity.Node).identity);
    }
    return [project.coder.emitExpectUnitsPattern(units)];
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
 * Consume the specified input node resolving its 'AND' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const patterns = resolve(project, node, state);
  if (patterns !== void 0) {
    if (patterns.length > 1) {
      return project.coder.emitExpectPattern(...patterns);
    }
    return patterns[0];
  }
  return void 0;
};

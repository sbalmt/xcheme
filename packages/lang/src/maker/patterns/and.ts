import * as Core from '@xcheme/core';

import * as Parser from '../../parser';

import { Project } from '../common/project';
import { State } from '../common/context';

import type { PatternEntry } from '../coder/base';

import * as String from './string';
import * as Expression from './expression';

/**
 * Merge all subsequent occurrences of the 'AND' pattern starting with the given input node.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param units Output units.
 * @param patterns Output patterns.
 * @returns Returns true when the merge consumption was successful, false otherwise.
 */
const merge = (project: Project, node: Core.Node, state: State, units: (string | number)[][], patterns: PatternEntry[]): boolean => {
  if (node.value === Parser.Nodes.And) {
    if (node.right!.value === Parser.Nodes.String) {
      units.push(String.resolve(project, state, node.right!.fragment.data));
      return merge(project, node.left!, state, units, patterns);
    }
    const lhs = resolve(project, node.left!, state);
    const rhs = resolve(project, node.right!, state);
    if (!lhs || !rhs) {
      return false;
    }
    patterns.push(...lhs, ...rhs);
  } else {
    if (node.value === Parser.Nodes.String) {
      units.push(String.resolve(project, state, node.fragment.data));
      return true;
    }
    const result = Expression.consume(project, node, state);
    if (!result) {
      return false;
    }
    patterns.push(result);
  }
  if (units.length > 0) {
    patterns.push(project.coder.emitExpectUnitsPattern(units.reverse().flat()));
  }
  return true;
};

/**
 * Resolve the specified input node as an 'AND' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
export const resolve = (project: Project, node: Core.Node, state: State): PatternEntry[] | undefined => {
  const units: (string | number)[][] = [];
  const patterns: PatternEntry[] = [];
  if (merge(project, node, state, units, patterns)) {
    if (patterns.length > 0) {
      return patterns;
    }
    if (units.length > 0) {
      return [project.coder.emitExpectUnitsPattern(units.reverse().flat())];
    }
  }
  return void 0;
};

/**
 * Consume the specified input node resolving its 'AND' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const patterns = resolve(project, node, state);
  if (patterns) {
    if (patterns.length > 1) {
      return project.coder.emitExpectPattern(...patterns);
    }
    return patterns[0];
  }
  return void 0;
};

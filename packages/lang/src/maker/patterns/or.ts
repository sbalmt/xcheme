import * as Core from '@xcheme/core';

import * as Parser from '../../parser';

import { Project } from '../common/project';
import { State } from '../common/context';

import type { PatternEntry } from '../coder/base';

import * as String from './string';
import * as Expression from './expression';

/**
 * Merge all subsequent occurrences of the 'OR' pattern starting with the given input node.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param units Output units.
 * @param patterns Output patterns.
 * @returns Returns true when the merge consumption was successful, false otherwise.
 */
const merge = (project: Project, node: Core.Node, state: State, units: (string | number)[][], patterns: PatternEntry[]): boolean => {
  let result: PatternEntry | undefined;
  if (node.value === Parser.Nodes.Or) {
    if (node.right!.value === Parser.Nodes.String) {
      const result = String.resolve(project, state, node.right!.fragment.data);
      if (result.length === 1) {
        units.push(result);
        return merge(project, node.left!, state, units, patterns);
      }
    }
    const lhs = resolve(project, node.left!, state);
    const rhs = resolve(project, node.right!, state);
    if (!lhs || !rhs) {
      return false;
    }
    patterns.push(...lhs, ...rhs);
  } else {
    if (node.value === Parser.Nodes.String) {
      const result = String.resolve(project, state, node.fragment.data);
      if (result.length === 1) {
        units.push(result);
        return true;
      }
    }
    result = Expression.consume(project, node, state);
    if (!result) {
      return false;
    }
    patterns.push(result);
  }
  if (units.length > 0) {
    patterns.push(project.coder.getChooseUnits(units.reverse().flat()));
  }
  return true;
};

/**
 * Resolve the specified input node as an 'OR' pattern.
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
      return [project.coder.getChooseUnits(units.reverse().flat())];
    }
  }
  return void 0;
};

/**
 * Consume the specified input node resolving its 'OR' rule.
 * It can also update the given project and state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the rule is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const patterns = resolve(project, node, state);
  if (patterns) {
    if (patterns.length > 1) {
      return project.coder.getChoose(...patterns);
    }
    return patterns[0];
  }
  return void 0;
};

import * as Core from '@xcheme/core';

import * as Parser from '../../parser';

import { Project } from '../common/project';
import { State } from '../common/context';

import type { PatternEntry } from '../coder/base';

import * as Alphabet from './alphabet';
import * as Expression from './expression';

/**
 * Alphabet type.
 */
type Alphabet = (string | number)[];

/**
 * Merge all subsequent occurrences of the 'AND' pattern starting with the given input node.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param alphabet Output alphabet.
 * @param patterns Output patterns.
 * @returns Returns true when the merge consumption was successful, false otherwise.
 */
const merge = (project: Project, node: Core.Node, state: State, alphabet: Alphabet[], patterns: PatternEntry[]): boolean => {
  let result: PatternEntry | undefined;
  if (node.value !== Parser.Nodes.And) {
    if (node.value === Parser.Nodes.Alphabet) {
      alphabet.push(Alphabet.resolve(project, state, node.fragment.data));
      return true;
    }
    result = Expression.consume(project, node, state);
  } else {
    if (node.right!.value === Parser.Nodes.Alphabet) {
      alphabet.push(Alphabet.resolve(project, state, node.right!.fragment.data));
      return merge(project, node.left!, state, alphabet, patterns);
    }
    const lhs = Expression.consume(project, node.left!, state);
    const rhs = Expression.consume(project, node.right!, state);
    if (lhs && rhs) {
      result = project.coder.getExpect(lhs, rhs);
    }
  }
  if (result) {
    patterns.push(result);
    if (alphabet.length > 0) {
      patterns.push(project.coder.getExpectAlphabet(alphabet.reverse().flat()));
    }
    return true;
  }
  return false;
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
  const alphabet: Alphabet[] = [];
  const patterns: PatternEntry[] = [];
  if (merge(project, node, state, alphabet, patterns)) {
    if (patterns.length > 0) {
      return patterns;
    }
    if (alphabet.length > 0) {
      return [project.coder.getExpectAlphabet(alphabet.reverse().flat())];
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
      return project.coder.getExpect(...patterns);
    }
    return patterns[0];
  }
  return void 0;
};

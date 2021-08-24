import * as Core from '@xcheme/core';

import * as String from '../common/string';
import * as Entries from '../common/entries';

import { Project } from '../common/project';
import { State, Types } from '../common/context';

import type { PatternEntry } from '../coder/base';

/**
 * Get the identity of the token that corresponds to the specified string.
 * When there's no token matching the given string, a new one will be created.
 * @param project Input project.
 * @param state Context state.
 * @param string Alphabet value.
 * @returns Returns the corresponding token identity.
 */
const getTokenId = (project: Project, state: State, string: string): string | number => {
  const token = project.tokenEntries.get(string);
  if (!token) {
    const identity = state.counter++;
    const pattern = project.coder.emitStringPattern([identity]);
    project.tokenEntries.add(identity, string, pattern, Entries.Types.Loose);
    return identity;
  }
  return token.identity;
};

/**
 * Resolve the specified input node as a string pattern.
 * It can also update the given project and context state when a new token needs to be created.
 * @param project Input project.
 * @param state Context state.
 * @param value String value.
 * @returns Returns the string resolution which is a token identity or an escaped string units.
 */
export const resolve = (project: Project, state: State, value: string): (string | number)[] => {
  if (state.type === Types.Node) {
    return [getTokenId(project, state, value)];
  }
  return String.extract(value).split('');
};

/**
 * Consume the specified input node resolving its string patterns.
 * It can also update the given project and context state when a new token needs to be created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry => {
  const name = node.fragment.data;
  const units = resolve(project, state, name);
  return project.coder.emitStringPattern(units);
};

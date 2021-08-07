import * as Core from '@xcheme/core';

import * as String from '../common/string';
import * as Entries from '../common/entries';

import { Project } from '../common/project';
import { State, Types } from '../common/context';

import type { PatternEntry } from '../coder/base';

/**
 * Get the Id of the token that corresponds to the specified alphabet.
 * When there's no token matching the given alphabet, a new one will be created.
 * @param project Input project.
 * @param state Context state.
 * @param alphabet Alphabet value.
 * @returns Returns the corresponding token Id.
 */
const getTokenId = (project: Project, state: State, alphabet: string): string | number => {
  const token = project.tokenEntries.get(alphabet);
  if (!token) {
    const id = state.counters.token++;
    const pattern = project.coder.getAlphabet([id]);
    project.tokenEntries.add(id, alphabet, pattern, Entries.Types.Loose);
    return id;
  }
  return token.id;
};

/**
 * Resolve the specified input node as an alphabet pattern.
 * It can also update the given project and context state when a new token is created.
 * @param project Input project.
 * @param state Context state.
 * @param value Alphabet value.
 * @returns Returns the alphabet resolution which is a token Id or an escaped string.
 */
export const resolve = (project: Project, state: State, value: string): (string | number)[] => {
  if (state.type === Types.Node) {
    return [getTokenId(project, state, value)];
  }
  return String.extract(value).split('');
};

/**
 * Consume the specified input node resolving its alphabet patterns.
 * It can also update the given project and context state when a new token is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry => {
  const name = node.fragment.data;
  const alphabet = resolve(project, state, name);
  return project.coder.getAlphabet(alphabet);
};

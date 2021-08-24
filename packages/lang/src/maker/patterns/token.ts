import * as Core from '@xcheme/core';

import * as Entries from '../common/entries';

import { Project } from '../common/project';
import { Pointers, State, Types } from '../common/context';
import { PatternEntry } from '../coder/base';

import * as Expression from './expression';

/**
 * Emit a new token entry into the given project.
 * @param project Input project.
 * @param identity Token identity.
 * @param name Token name.
 * @param pattern Token pattern.
 * @param type Token type.
 * @param ref Determines whether or not the node is referenced by another one.
 */
const emit = (project: Project, identity: number, name: string, pattern: PatternEntry, type: Entries.Types, ref: boolean): void => {
  if (ref) {
    const reference = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
    project.tokenPointerEntries.add(identity, name, pattern, Entries.Types.Normal);
    project.tokenEntries.add(identity, name, reference, type);
  } else {
    project.tokenEntries.add(identity, name, pattern, type);
  }
};

/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param identity Pattern identity.
 * @param pointer Initial context pointers.
 * @param counter Initial context counter.
 * @param alias Determines whether or not the token is an alias.
 * @returns Returns the consumption state.
 */
export const consume = (
  project: Project,
  node: Core.Node,
  identity: number,
  pointers: Pointers,
  counter: number,
  alias: boolean
): State => {
  const state = { identity, pointers, counter, type: Types.Token };
  const entry = Expression.consume(project, node.right!, state);
  if (entry) {
    const name = node.fragment.data;
    const referenced = pointers.has(name);
    if (alias) {
      emit(project, identity, name, entry, Entries.Types.Alias, referenced);
    } else {
      const pattern = project.coder.emitTokenPattern(identity, entry);
      emit(project, identity, name, pattern, Entries.Types.Normal, referenced);
    }
  }
  return state;
};

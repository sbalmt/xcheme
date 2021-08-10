import * as Core from '@xcheme/core';

import * as Entries from '../common/entries';

import { Project } from '../common/project';
import { Pointers, State, Types } from '../common/context';

import * as Expression from './expression';

/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param pointers Initial context pointers.
 * @param counter Initial context counter.
 * @returns Returns the consumption state.
 */
export const consume = (project: Project, node: Core.Node, pointers: Pointers, counter: number): State => {
  const state = { identity: counter, pointers, counter, type: Types.Skip };
  const entry = Expression.consume(project, node, state);
  if (entry) {
    project.skipEntries.add(counter, `SKIP${counter}`, entry, Entries.Types.Normal);
  }
  return state;
};

import * as Core from '@xcheme/core';

import * as Entries from '../common/entries';

import { Project } from '../common/project';
import { Counters, Pointers, Types } from '../common/context';

import * as Expression from './expression';

/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param id Skip Id.
 * @param pointers Initial context pointers.
 * @param counters Initial context counters.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, id: number, pointers: Pointers, counters: Counters): void => {
  const entry = Expression.consume(project, node, { id, pointers, counters, type: Types.Skip });
  if (entry) {
    project.skipEntries.add(id, `SKIP${id}`, entry, Entries.Types.Normal);
  }
};

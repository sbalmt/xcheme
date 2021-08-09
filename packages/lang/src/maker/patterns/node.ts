import * as Core from '@xcheme/core';

import * as Entries from '../common/entries';

import { Project } from '../common/project';
import { Counters, Pointers, Types } from '../common/context';
import { PatternEntry } from '../coder/base';

import * as Expression from './expression';

/**
 * Emit a new node entry into the given project.
 * @param project Input project.
 * @param id Node Id.
 * @param name Node name.
 * @param pattern Node pattern.
 * @param type Node type.
 * @param referenced Determines whether or not the node is referenced by another one.
 */
const emit = (project: Project, id: number, name: string, pattern: PatternEntry, type: Entries.Types, referenced: boolean): void => {
  if (referenced) {
    const reference = project.coder.getReference(project.nodePointerEntries, name);
    project.nodePointerEntries.add(id, name, pattern, Entries.Types.Normal);
    project.nodeEntries.add(id, name, reference, type);
  } else {
    project.nodeEntries.add(id, name, pattern, type);
  }
};

/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param pointers Initial context pointers.
 * @param counters Initial context counters.
 * @param alias Determines whether or not the node is an alias.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, pointers: Pointers, counters: Counters, alias: boolean): void => {
  const id = counters.node;
  const entry = Expression.consume(project, node.right!, { id, pointers, counters, type: Types.Node });
  if (entry) {
    const name = node.fragment.data;
    const referenced = pointers.has(name);
    if (alias) {
      emit(project, id, name, entry, Entries.Types.Alias, referenced);
    } else {
      const pattern = project.coder.getNode(id, Core.Nodes.Right, entry);
      emit(project, id, name, pattern, Entries.Types.Normal, referenced);
    }
  }
};

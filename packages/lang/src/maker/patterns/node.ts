import * as Core from '@xcheme/core';

import * as Entries from '../common/entries';

import { Project } from '../common/project';
import { Pointers, State, Types } from '../common/context';
import { PatternEntry } from '../coder/base';

import * as Expression from './expression';

/**
 * Emit a new node entry into the given project.
 * @param project Input project.
 * @param identity Node identity.
 * @param name Node name.
 * @param pattern Node pattern.
 * @param type Node type.
 * @param ref Determines whether or not the node is referenced by another one.
 */
const emit = (project: Project, identity: number, name: string, pattern: PatternEntry, type: Entries.Types, ref: boolean): void => {
  if (ref) {
    const reference = project.coder.getReference(project.nodePointerEntries, name);
    project.nodePointerEntries.add(identity, name, pattern, Entries.Types.Normal);
    project.nodeEntries.add(identity, name, reference, type);
  } else {
    project.nodeEntries.add(identity, name, pattern, type);
  }
};

/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param identity Pattern identity.
 * @param pointers Initial context pointers.
 * @param counter Initial context counter.
 * @param alias Determines whether or not the node is an alias.
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
  const state = { identity, pointers, counter, type: Types.Node };
  const entry = Expression.consume(project, node.right!, state);
  if (entry) {
    const name = node.fragment.data;
    const referenced = pointers.has(name);
    if (alias) {
      emit(project, identity, name, entry, Entries.Types.Alias, referenced);
    } else {
      const pattern = project.coder.getNode(identity, Core.Nodes.Right, entry);
      emit(project, identity, name, pattern, Entries.Types.Normal, referenced);
    }
  }
  return state;
};

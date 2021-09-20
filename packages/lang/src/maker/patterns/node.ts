import * as Core from '@xcheme/core';

import * as Entries from '../../core/entries';
import * as Directive from '../../optimizer/nodes/directive';

import { Project } from '../../core/project';
import { Pointers, Types } from '../context';
import { PatternEntry } from '../coder/base';

import * as Expression from './expression';

/**
 * Emit a new node entry into the given project.
 * @param project Input project.
 * @param type Node type.
 * @param name Node name.
 * @param identity Node identity.
 * @param pattern Node pattern.
 * @param ref Determines whether or not the node is referenced by another one.
 */
const emit = (project: Project, type: Entries.Types, name: string, identity: number, pattern: PatternEntry, ref: boolean): void => {
  if (ref) {
    const reference = project.coder.emitReferencePattern(project.nodePointerEntries, name);
    project.nodePointerEntries.add(Entries.Types.Normal, name, identity, pattern);
    project.nodeEntries.add(type, name, identity, reference);
  } else {
    project.nodeEntries.add(type, name, identity, pattern);
  }
};

/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param directive Directive node.
 * @param pointers Initial context pointers.
 * @param alias Determines whether or not the node is an alias.
 */
export const consume = (project: Project, directive: Directive.Node, pointers: Pointers, alias: boolean): void => {
  const identity = directive.dynamic ? Core.BaseSource.Output : directive.identity;
  const state = { type: Types.Node, identity, pointers };
  const expression = Expression.consume(project, directive.right!, state);
  if (expression !== void 0) {
    const identifier = directive.fragment.data;
    const referenced = pointers.has(identifier);
    if (alias) {
      emit(project, Entries.Types.Alias, identifier, identity, expression, referenced);
    } else {
      const pattern = project.coder.emitNodePattern(identity, Core.Nodes.Right, expression);
      emit(project, Entries.Types.Normal, identifier, identity, pattern, referenced);
    }
  }
};

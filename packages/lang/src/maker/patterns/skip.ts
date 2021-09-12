import * as Entries from '../../core/entries';
import * as Directive from '../../optimizer/nodes/directive';

import { Project } from '../../core/project';
import { Pointers, Types } from '../context';

import * as Expression from './expression';

/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param directive Directive node.
 * @param identity Pattern identity.
 * @param pointer Initial context pointers.
 */
export const consume = (project: Project, directive: Directive.Node, pointers: Pointers): void => {
  const identity = directive.identity;
  const state = { type: Types.Skip, identity, pointers };
  const expression = Expression.consume(project, directive.right!, state);
  if (expression !== void 0) {
    project.skipEntries.add(Entries.Types.Normal, `@SKIP${identity}`, identity, expression);
  }
};

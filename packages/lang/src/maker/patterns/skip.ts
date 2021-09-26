import * as Directive from '../../optimizer/nodes/directive';

import { Project } from '../../core/project';
import { Types } from '../context';

import * as Expression from './expression';

/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param directive Directive node.
 */
export const consume = (project: Project, directive: Directive.Node): void => {
  const identity = directive.identity;
  const state = { type: Types.Skip, identity, dynamic: false };
  const expression = Expression.consume(project, directive.right!, state);
  if (expression !== void 0) {
    const entry = project.skipEntries.get(directive.identifier)!;
    entry.pattern = expression;
  }
};

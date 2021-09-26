import * as Core from '@xcheme/core';

import * as Directive from '../../optimizer/nodes/directive';

import { Project } from '../../core/project';
import { Types } from '../context';

import * as Expression from './expression';

/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param directive Directive node.
 */
export const consume = (project: Project, directive: Directive.Node): void => {
  const state = { type: Types.Token, identity: directive.identity, dynamic: directive.dynamic };
  const expression = Expression.consume(project, directive.right!, state);
  if (expression !== void 0) {
    const entry = project.tokenEntries.get(directive.identifier)!;
    if (!directive.alias) {
      const identity = directive.dynamic ? Core.BaseSource.Output : directive.identity;
      entry.pattern = project.coder.emitTokenPattern(identity, expression);
    } else {
      entry.pattern = expression;
    }
    if (entry.references > 0) {
      const identifier = `@REF${entry.identity}`;
      const reference = project.tokenEntries.add(entry.type, entry.origin, identifier, entry.identity, entry.dynamic);
      reference.pattern = project.coder.emitReferencePattern(project.tokenEntries, entry.identifier);
    }
  }
};

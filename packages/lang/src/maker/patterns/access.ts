import * as Core from '@xcheme/core';

import * as Identity from '../../optimizer/nodes/identity';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';
import { State } from '../context';

import type { PatternEntry } from '../coder/base';

/**
 * Consume the specified input node resolving its access pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  if (node instanceof Identity.Node) {
    return project.coder.emitExpectUnitsPattern([node.identity]);
  }
  project.errors.push(new Core.Error(node.fragment, Errors.UNSUPPORTED_NODE));
  return void 0;
};

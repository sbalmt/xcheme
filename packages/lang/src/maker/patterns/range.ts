import * as Core from '@xcheme/core';

import * as String from '../../core/string';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';
import { State, Types } from '../context';

import type { PatternEntry } from '../coder/base';

/**
 * Consume the specified input node resolving its range pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  if (state.type === Types.Node) {
    project.errors.push(new Core.Error(node.fragment, Errors.UNSUPPORTED_NODE));
    return void 0;
  }
  const from = String.extract(node.left!.fragment.data);
  const to = String.extract(node.right!.fragment.data);
  return project.coder.emitRangePattern(from, to);
};

import * as Core from '@xcheme/core';

import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as String from '../../core/string';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Consume the given node resolving the range pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  const directive = state.directive;
  if (directive.type !== Symbols.Types.Node) {
    const from = String.extract(node.left!.fragment.data);
    const to = String.extract(node.right!.fragment.data);
    return project.coder.emitRangePattern(from, to);
  }
  project.addError(node.fragment, Errors.UNSUPPORTED_NODE);
  return void 0;
};

import * as Core from '@xcheme/core';

import * as Identified from '../../core/nodes/identified';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';

import { Errors } from '../../core/errors';

/**
 * Consume the given node resolving the access pattern.
 * @param project Project context.
 * @param node Input node.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node): Coder.Pattern | undefined => {
  if (node instanceof Identified.Node) {
    return project.coder.emitExpectUnitsPattern([node.identity]);
  }
  project.addError(node.fragment, Errors.UNSUPPORTED_NODE);
  return void 0;
};

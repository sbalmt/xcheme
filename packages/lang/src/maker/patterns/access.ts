import * as Core from '@xcheme/core';

import * as Nodes from '../../core/nodes';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';

import { Exception } from '../../core/exception';

/**
 * Consume the given node resolving the access pattern.
 * @param project Project context.
 * @param node Access node.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (project: Project.Context, node: Core.Node): Coder.Pattern => {
  if (!(node instanceof Nodes.Identity)) {
    throw new Exception('The ACCESS node must be an instance of an identified node.');
  }
  return project.coder.emitExpectUnitsPattern([node.identity]);
};

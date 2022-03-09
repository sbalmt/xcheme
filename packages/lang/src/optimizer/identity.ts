import * as Core from '@xcheme/core';

import * as Project from '../core/project';

/**
 * Resolve the current identity for the given node.
 * @param project Project context.
 * @param node Input node.
 * @returns Returns the resolved identity.
 */
export const resolve = (project: Project.Context, node: Core.Node): number => {
  if (node.left) {
    const value = node.left.fragment.data;
    if (value === 'auto') {
      return Core.BaseSource.Output;
    }
    const identity = parseInt(value);
    if (!isNaN(identity)) {
      return identity;
    }
  }
  return Project.Context.identity.increment(project.coder, project.options.identity);
};

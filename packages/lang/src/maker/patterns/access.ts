import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Nodes from '../../core/nodes';
import * as Types from '../../core/types';

/**
 * Consume the given node making the ACCESS pattern.
 * @param project Project context.
 * @param node ACCESS node.
 * @returns Returns the resolved pattern.
 */
export const consume = (project: Project.Context, node: Types.Node): Coder.Pattern => {
  return project.coder.emitExpectUnitsPattern([Nodes.getIdentity(node)]);
};

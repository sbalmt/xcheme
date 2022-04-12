import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Nodes from '../../core/nodes';
import * as Types from '../../core/types';
import * as Context from '../context';

import * as Generic from './generic';

/**
 * Consume the given node making the HAS pattern.
 * @param project Project context.
 * @param node HAS node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State
): Coder.Pattern | undefined => {
  const patterns = Generic.State.consume(project, node, state);
  if (patterns) {
    const identity = Nodes.getIdentity(node);
    return project.coder.emitHasPattern(identity, ...patterns);
  }
  return void 0;
};

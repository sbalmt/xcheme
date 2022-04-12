import * as Coder from '../../core/coder/base';
import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import * as Generic from './generic';

/**
 * Consume the given node making the SYMBOL pattern.
 * @param project Project context.
 * @param node SYMBOL node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State
): Coder.Pattern | undefined => {
  const patterns = Generic.Identity.consume(project, node, state);
  if (patterns) {
    const [test, ...remaining] = patterns;
    const identity = Nodes.getIdentity(node);
    return project.coder.emitSymbolPattern(identity, test, ...remaining);
  }
  return void 0;
};

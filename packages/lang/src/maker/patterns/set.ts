import * as Nodes from '../../core/nodes';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import { Exception } from '../../core/exception';

import * as Generic from './generic';

/**
 * Consume the given node resolving the 'SET' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State
): Coder.Pattern | undefined => {
  if (!(node instanceof Nodes.Identity)) {
    throw new Exception('The SET node must be an instance of an identified node.');
  }
  const patterns = Generic.State.consume(project, node, state);
  if (patterns) {
    return project.coder.emitSetPattern(node.identity, ...patterns);
  }
  return void 0;
};

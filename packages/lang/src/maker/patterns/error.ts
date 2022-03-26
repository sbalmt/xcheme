import * as Nodes from '../../core/nodes';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import { Exception } from '../../core/exception';

import * as And from './and';

/**
 * Consume the given node resolving the 'ERROR' pattern.
 * @param project Context project.
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
    throw new Exception('The ERROR node must be an instance of an identified node.');
  }
  const expression = node.right!;
  const patterns = And.resolve(project, expression.right!, state);
  if (patterns) {
    return project.coder.emitErrorPattern(node.identity, ...patterns);
  }
  return void 0;
};

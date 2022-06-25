import * as Parser from '@xcheme/parser';

import * as Coder from '../../../core/coder/base';
import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Context from '../../context';

import * as And from '../and';

/**
 * Consume the given node making the STATE pattern.
 * @param project Project context.
 * @param node STATE node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State
): Coder.Pattern[] | undefined => {
  const argument = node.right!;
  if (argument.value === Parser.Nodes.Arguments) {
    return And.resolve(project, argument.right!, state);
  }
  return And.resolve(project, argument, state);
};

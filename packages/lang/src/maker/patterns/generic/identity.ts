import * as Nodes from '../../../core/nodes';
import * as Coder from '../../../core/coder/base';
import * as Project from '../../../core/project';
import * as Parser from '../../../parser';
import * as Splitter from '../../splitter';
import * as Context from '../../context';

/**
 * Consume the given node resolving the identity pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Nodes.Identity,
  state: Context.State
): Coder.Pattern[] | undefined => {
  const argument = node.right!;
  if (argument.value !== Parser.Nodes.Arguments) {
    return Splitter.resolve(project, argument, state);
  }
  const current = state.dynamic;
  state.dynamic = node.dynamic;
  const patterns = Splitter.resolve(project, argument.right!, state);
  state.dynamic = current;
  return patterns;
};

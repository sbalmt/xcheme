import * as Coder from '../core/coder/base';
import * as Nodes from '../core/nodes';
import * as Project from '../core/project';
import * as String from '../core/string';
import * as Types from '../core/types';
import * as Parser from '../parser';
import * as Context from './context';

import * as And from './patterns/and';

/**
 * Split the first part of the specified sequential node and resolve all the patterns.
 * @param project Project context.
 * @param node Sequential node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const split = (project: Project.Context, node: Types.Node, state: Context.State): Coder.Pattern[] | undefined => {
  const current = node.data.sequence!.shift()!;
  const patterns = And.resolve(project, node, state);
  if (patterns) {
    let units;
    if (node.data.type === Types.Nodes.StringSequence) {
      units = String.extract(current.fragment.data).split('');
    } else {
      units = [Nodes.getIdentity(current)];
    }
    return [project.coder.emitExpectUnitsPattern(units), ...patterns];
  }
  return void 0;
};

/**
 * Traverse the specified node trying to split the first part of the sequential node and resolve all the patterns.
 * @param project Project context.
 * @param node Sequential node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const traverse = (project: Project.Context, node: Types.Node, state: Context.State): Coder.Pattern[] | undefined => {
  const left = resolve(project, node.left!, state);
  if (left) {
    const right = resolve(project, node.right!, state);
    if (right) {
      return [...left, ...right];
    }
  }
  return void 0;
};

/**
 * Resolve the given node splitting the first part from the sequential node in an AND pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
export const resolve = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State
): Coder.Pattern[] | undefined => {
  if (node.value === Parser.Nodes.And) {
    if (node.assigned && node.data.sequence !== void 0) {
      if (node.data.sequence.length > 1) {
        return split(project, node, state);
      }
    } else {
      return traverse(project, node, state);
    }
  }
  return And.resolve(project, node, state);
};

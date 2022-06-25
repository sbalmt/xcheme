import * as Parser from '@xcheme/parser';

import * as Coder from '../../core/coder/base';
import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as String from '../../core/string';
import * as Types from '../../core/types';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Resolve the AND pattern in the given expression node.
 * @param project Project context.
 * @param node Expression node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the expression node is invalid.
 */
export const resolve = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State
): Coder.Pattern[] | undefined => {
  if (node.value !== Parser.Nodes.And) {
    const pattern = Expression.consume(project, node, state);
    if (pattern) {
      return [pattern];
    }
  } else if (node.assigned && node.data.sequence !== void 0) {
    let units;
    if (node.data.type === Types.Nodes.StringSequence) {
      const words = node.data.sequence.map((node) => String.extract(node.fragment.data));
      units = words.join('').split('');
    } else {
      units = node.data.sequence.map((node) => Nodes.getIdentity(node));
    }
    return [project.coder.emitExpectUnitsPattern(units)];
  } else {
    const left = resolve(project, node.left!, state);
    if (left) {
      const right = resolve(project, node.right!, state);
      if (right) {
        return [...left, ...right];
      }
    }
  }
  return void 0;
};

/**
 * Consume the given node making the AND pattern.
 * @param project Project context.
 * @param node AND node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State
): Coder.Pattern | undefined => {
  const patterns = resolve(project, node, state);
  if (patterns) {
    if (patterns.length > 1) {
      return project.coder.emitExpectPattern(...patterns);
    }
    return patterns[0];
  }
  return void 0;
};

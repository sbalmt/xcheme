import * as Core from '@xcheme/core';

import * as Mergeable from '../../core/nodes/mergeable';
import * as Identity from '../../core/nodes/identity';
import * as Coder from '../../core/coder/base';
import * as String from '../../core/string';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Resolve the given input node as an 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
export const resolve = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern[] | undefined => {
  if (node.value !== Parser.Nodes.And) {
    const pattern = Expression.consume(project, node, state);
    if (pattern !== void 0) {
      return [pattern];
    }
  } else if (node instanceof Mergeable.Node) {
    let units;
    if (node.type === Parser.Nodes.String) {
      const words = node.sequence.map((node) => String.extract(node.fragment.data));
      units = words.join('').split('');
    } else {
      units = node.sequence.map((node) => (node as Identity.Node).identity);
    }
    return [project.coder.emitExpectUnitsPattern(units)];
  } else {
    const left = resolve(project, node.left!, state);
    if (left !== void 0) {
      const right = resolve(project, node.right!, state);
      if (right !== void 0) {
        return [...left, ...right];
      }
    }
  }
  return void 0;
};

/**
 * Consume the given node resolving the 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  const patterns = resolve(project, node, state);
  if (patterns !== void 0) {
    if (patterns.length > 1) {
      return project.coder.emitExpectPattern(...patterns);
    }
    return patterns[0];
  }
  return void 0;
};

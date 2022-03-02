import * as Core from '@xcheme/core';

import * as Sequential from '../../core/nodes/sequential';
import * as Identified from '../../core/nodes/identified';
import * as Coder from '../../core/coder/base';
import * as String from '../../core/string';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Resolve the given node as an 'OR' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
export const resolve = (
  project: Project.Context,
  node: Core.Node,
  state: Context.State
): Coder.Pattern[] | undefined => {
  if (node.value !== Parser.Nodes.Or) {
    const pattern = Expression.consume(project, node, state);
    if (pattern) {
      return [pattern];
    }
  } else if (node instanceof Sequential.Node) {
    if (node.type === Parser.Nodes.String) {
      const fragments = node.sequence.map((node) => String.extract(node.fragment.data));
      if (fragments.length > 3 || fragments.find((fragment) => fragment.length > 1)) {
        const routes = fragments.map((fragment) => project.coder.getRoute(fragment.split('')));
        return [project.coder.emitMapPattern(...routes)];
      }
      return [project.coder.emitChooseUnitsPattern(fragments)];
    } else {
      const units = node.sequence.map((node) => (node as Identified.Node).identity);
      if (units.length > 3) {
        const routes = units.map((unit) => project.coder.getRoute([unit]));
        return [project.coder.emitMapPattern(...routes)];
      }
      return [project.coder.emitChooseUnitsPattern(units)];
    }
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
 * Consume the given node resolving the 'OR' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  const patterns = resolve(project, node, state);
  if (patterns) {
    if (patterns.length > 1) {
      return project.coder.emitChoosePattern(...patterns);
    }
    return patterns[0];
  }
  return void 0;
};

import * as Core from '@xcheme/core';

import * as Mergeable from '../../core/nodes/mergeable';
import * as Identity from '../../core/nodes/identity';
import * as Coder from '../../core/coder/base';
import * as String from '../../core/string';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as And from '../patterns/and';

/**
 * Resolve the given node considering that the output will be used in a node emission pattern.
 * REMARKS: When emitting a node into the AST, the first pattern (a.k.a test pattern)
 * must be separate of the remaining patterns.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
export const resolve = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern[] | undefined => {
  if (node.value === Parser.Nodes.And && node instanceof Mergeable.Node && node.sequence.length > 1) {
    const test = node.sequence.shift()!;
    const patterns = And.resolve(project, node, state);
    if (patterns !== void 0) {
      let units;
      if (node.type === Parser.Nodes.String) {
        units = String.extract(test.fragment.data).split('');
      } else {
        units = [(test as Identity.Node).identity];
      }
      return [project.coder.emitExpectUnitsPattern(units), ...patterns];
    }
    return void 0;
  }
  return And.resolve(project, node, state);
};

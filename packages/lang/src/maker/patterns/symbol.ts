import * as Core from '@xcheme/core';

import * as Identified from '../../core/nodes/identified';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Splitter from '../splitter';
import * as Context from '../context';

import { Exception } from '../../core/exception';

/**
 * Consume the given node resolving the 'SYMBOL' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  if (!(node instanceof Identified.Node)) {
    throw new Exception('The SYMBOL node must be an instance of an identified node.');
  }
  const expression = (node.right!.value === Parser.Nodes.State ? node.right!.right : node.right)!;
  const patterns = Splitter.resolve(project, expression, state);
  if (patterns) {
    const [test, ...remaining] = patterns;
    return project.coder.emitSymbolPattern(node.identity, test, ...remaining);
  }
  return void 0;
};

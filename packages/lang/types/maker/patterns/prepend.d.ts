import * as Core from '@xcheme/core';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Nodes from '../resolvers/nodes';
import * as Context from '../context';
/**
 * Consume the given node resolving the 'PREPEND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param direction Prepended node direction.
 * @returns Returns the consumption result or undefined when the node is invalid.
 */
export declare const consume: (project: Project.Context, node: Core.Node, state: Context.State, direction: Core.Nodes) => Coder.Pattern | undefined;

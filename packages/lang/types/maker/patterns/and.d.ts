import * as Core from '@xcheme/core';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Context from '../context';
/**
 * Resolve the given input node as an 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
export declare const resolve: (project: Project.Context, node: Core.Node, state: Context.State) => Coder.Pattern[] | undefined;
/**
 * Consume the given node resolving the 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export declare const consume: (project: Project.Context, node: Core.Node, state: Context.State) => Coder.Pattern | undefined;

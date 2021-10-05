import * as Core from '@xcheme/core';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Context from '../context';
/**
 * Resolve the given node considering that the output will be used in a node emission pattern.
 * REMARKS: When emitting a node into the AST, the first pattern (a.k.a test pattern)
 * must be separate of the remaining patterns.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
export declare const resolve: (project: Project.Context, node: Core.Node, state: Context.State) => Coder.Pattern[] | undefined;

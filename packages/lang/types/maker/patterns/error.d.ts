import * as Core from '@xcheme/core';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Context from '../context';
/**
 * Consume the given node resolving the 'ERROR' pattern.
 * @param project Context project.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export declare const consume: (project: Project.Context, node: Core.Node, state: Context.State) => Coder.Pattern | undefined;

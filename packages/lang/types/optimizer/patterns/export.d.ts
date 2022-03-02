import * as Core from '@xcheme/core';
import * as Project from '../../core/project';
import * as Context from '../context';
/**
 * Consume the export directive for the given node and update the specified state.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns true when the given node is valid for the export directive, false otherwise.
 */
export declare const consume: (project: Project.Context, node: Core.Node, state: Context.State) => boolean;

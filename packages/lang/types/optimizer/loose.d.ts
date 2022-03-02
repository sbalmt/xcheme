import * as Core from '@xcheme/core';
import * as Project from '../core/project';
import * as Context from './context';
/**
 * Determines whether or not there are a collision for the given name.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Input node.
 * @returns Returns true when the specified name already exists, false otherwise.
 */
export declare const collision: (project: Project.Context, identifier: string, node: Core.Node) => boolean;
/**
 * Resolve the loose pattern record for the given node.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the loose pattern record.
 */
export declare const resolve: (project: Project.Context, identifier: string, node: Core.Node, state: Context.State) => Core.Record;

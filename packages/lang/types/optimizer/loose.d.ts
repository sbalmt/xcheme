import * as Core from '@xcheme/core';
import * as Project from '../core/project';
import * as Entries from '../core/entries';
import * as Context from './context';
/**
 * Determines whether or not there are an entry collision for the given name.
 * @param project Project context.
 * @param node Input node.
 * @param name Entry name.
 * @returns Returns true when the specified name already exists, false otherwise.
 */
export declare const collision: (project: Project.Context, node: Core.Node, name: string) => boolean;
/**
 * Resolve the loose pattern entry for the given node.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Entry name.
 * @returns Returns the loose pattern entry.
 */
export declare const resolve: (project: Project.Context, node: Core.Node, state: Context.State, name: string) => Entries.Entry;

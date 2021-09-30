import * as Core from '@xcheme/core';
import * as Project from '../core/project';
import * as Entries from '../core/entries';
import * as Context from './context';
/**
 * Emit a new loose token and returns the corresponding pattern entry.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Loose token name.
 * @returns Returns the generated pattern entry.
 */
export declare const emitToken: (project: Project.Context, node: Core.Node, state: Context.State, name: string) => Entries.Entry;

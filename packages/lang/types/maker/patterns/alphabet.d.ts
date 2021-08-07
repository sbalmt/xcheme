import * as Core from '@xcheme/core';
import { Project } from '../common/project';
import { State } from '../common/context';
import type { PatternEntry } from '../coder/base';
/**
 * Resolve the specified input node as an alphabet pattern.
 * It can also update the given project and context state when a new token is created.
 * @param project Input project.
 * @param state Context state.
 * @param value Alphabet value.
 * @returns Returns the alphabet resolution which is a token Id or an escaped string.
 */
export declare const resolve: (project: Project, state: State, value: string) => (string | number)[];
/**
 * Consume the specified input node resolving its alphabet patterns.
 * It can also update the given project and context state when a new token is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result.
 */
export declare const consume: (project: Project, node: Core.Node, state: State) => PatternEntry;

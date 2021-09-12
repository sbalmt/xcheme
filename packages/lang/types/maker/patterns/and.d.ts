import * as Core from '@xcheme/core';
import { Project } from '../../core/project';
import { State } from '../context';
import type { PatternEntry } from '../coder/base';
/**
 * Resolve the specified input node as an 'AND' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
export declare const resolve: (project: Project, node: Core.Node, state: State) => PatternEntry[] | undefined;
/**
 * Consume the specified input node resolving its 'AND' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export declare const consume: (project: Project, node: Core.Node, state: State) => PatternEntry | undefined;

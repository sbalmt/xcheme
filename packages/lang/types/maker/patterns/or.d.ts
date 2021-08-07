import * as Core from '@xcheme/core';
import { Project } from '../common/project';
import { State } from '../common/context';
import type { PatternEntry } from '../coder/base';
/**
 * Resolve the specified input node as an 'OR' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
export declare const resolve: (project: Project, node: Core.Node, state: State) => PatternEntry[] | undefined;
/**
 * Consume the specified input node resolving its 'OR' rule.
 * It can also update the given project and state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the rule is invalid.
 */
export declare const consume: (project: Project, node: Core.Node, state: State) => PatternEntry | undefined;

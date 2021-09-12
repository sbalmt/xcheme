import * as Core from '@xcheme/core';
import { Project } from '../../core/project';
import { State } from '../context';
import type { PatternEntry } from '../coder/base';
/**
 * Consume the specified input node resolving its expression patterns.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export declare const consume: (project: Project, node: Core.Node, state: State) => PatternEntry | undefined;

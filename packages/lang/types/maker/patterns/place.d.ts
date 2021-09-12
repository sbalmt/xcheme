import * as Core from '@xcheme/core';
import { Project } from '../../core/project';
import { State } from '../context';
import type { PatternEntry } from '../coder/base';
/**
 * Consume the specified input node resolving its 'PLACE' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param direction Placed node direction.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export declare const consume: (project: Project, node: Core.Node, state: State, direction: Core.Nodes) => PatternEntry | undefined;

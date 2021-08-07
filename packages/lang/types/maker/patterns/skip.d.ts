import * as Core from '@xcheme/core';
import { Project } from '../common/project';
import { Counters, Pointers } from '../common/context';
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param id Skip Id.
 * @param pointers Initial context pointers.
 * @param counters Initial context counters.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export declare const consume: (project: Project, node: Core.Node, id: number, pointers: Pointers, counters: Counters) => void;

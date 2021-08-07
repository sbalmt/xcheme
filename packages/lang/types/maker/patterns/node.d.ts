import * as Core from '@xcheme/core';
import { Project } from '../common/project';
import { Counters, Pointers } from '../common/context';
/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param pointers Initial context pointers.
 * @param counters Initial context counters.
 * @param alias Determines whether or not the node is an alias.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export declare const consume: (project: Project, node: Core.Node, pointers: Pointers, counters: Counters, alias: boolean) => void;

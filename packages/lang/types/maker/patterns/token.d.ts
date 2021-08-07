import * as Core from '@xcheme/core';
import { Project } from '../common/project';
import { Counters, Pointers } from '../common/context';
/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param pointer Initial context pointers.
 * @param counter Initial context counters.
 * @param alias Determines whether or not the token is an alias.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export declare const consume: (project: Project, node: Core.Node, pointers: Pointers, counters: Counters, alias: boolean) => void;

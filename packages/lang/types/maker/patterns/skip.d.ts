import * as Core from '@xcheme/core';
import { Project } from '../common/project';
import { Pointers, State } from '../common/context';
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param pointers Initial context pointers.
 * @param counter Initial context counter.
 * @returns Returns the consumption state.
 */
export declare const consume: (project: Project, node: Core.Node, pointers: Pointers, counter: number) => State;

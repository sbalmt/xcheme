import * as Core from '@xcheme/core';
import { Project } from '../common/project';
import { Pointers, State } from '../common/context';
/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param identity Pattern identity.
 * @param pointer Initial context pointers.
 * @param counter Initial context counter.
 * @param alias Determines whether or not the token is an alias.
 * @returns Returns the consumption state.
 */
export declare const consume: (project: Project, node: Core.Node, identity: number, pointers: Pointers, counter: number, alias: boolean) => State;

import * as Core from '@xcheme/core';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Context from '../context';
/**
 * Consume the given node resolving the string pattern.
 * @param project Project context.
 * @param node String node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
export declare const consume: (project: Project.Context, node: Core.Node, state: Context.State) => Coder.Pattern;

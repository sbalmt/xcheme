import * as Core from '@xcheme/core';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
/**
 * Consume the given node resolving the access pattern.
 * @param project Project context.
 * @param node Access node.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
export declare const consume: (project: Project.Context, node: Core.Node) => Coder.Pattern;

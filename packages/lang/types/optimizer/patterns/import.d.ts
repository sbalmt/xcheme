import * as Core from '@xcheme/core';
import * as Project from '../../core/project';
/**
 * Resolve the import directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
export declare const resolve: (project: Project.Context, node: Core.Node) => void;

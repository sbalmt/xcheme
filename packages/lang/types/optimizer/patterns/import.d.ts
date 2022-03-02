import * as Core from '@xcheme/core';
import * as Project from '../../core/project';
/**
 * Consume the import directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
export declare const consume: (project: Project.Context, node: Core.Node) => void;

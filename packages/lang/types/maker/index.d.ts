import * as Core from '@xcheme/core';
import * as Project from '../core/project';
import * as Node from './patterns/node';
/**
 * Consume the specified node (organized as an AST) and update the given project.
 * @param node Root node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export declare const consumeNodes: (node: Core.Node, project: Project.Context) => boolean;

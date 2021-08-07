import * as Core from '@xcheme/core';
import { Project } from './common/project';
import * as Node from './patterns/node';
/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Output project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export declare const consumeNodes: (node: Core.Node, project: Project) => boolean;

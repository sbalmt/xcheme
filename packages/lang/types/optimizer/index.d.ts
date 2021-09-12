import * as Core from '@xcheme/core';
import * as Node from './patterns/node';
import { Project } from '../core/project';
/**
 * Consume the specified node (organized as an AST) and generate an optimized AST for the maker.
 * @param node Input node.
 * @param project Input project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export declare const consumeNodes: (node: Core.Node, project: Project) => boolean;

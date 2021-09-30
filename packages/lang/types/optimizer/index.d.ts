import * as Core from '@xcheme/core';
import * as Project from '../core/project';
import * as Context from './context';
import * as Node from './patterns/node';
/**
 * Consume the specified node (organized as an AST) and optimize that AST for the maker.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export declare const consumeNodes: (node: Core.Node, project: Project.Context) => boolean;

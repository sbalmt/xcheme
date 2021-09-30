import * as Core from '@xcheme/core';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';
/**
 * Consume a child node from the AST on the given parent and optimize the mergeable pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param type Mergeable node type.
 * @param state Context state.
 */
export declare const consume: (project: Project.Context, direction: Core.Nodes, parent: Core.Node, type: Parser.Nodes, state: Context.State) => void;

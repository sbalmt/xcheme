import * as Core from '@xcheme/core';
import * as Parser from '../../parser';
import * as Context from '../context';
import { Project } from '../../core/project';
/**
 * Consume the specified input node optimizing its mergeable pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param type Mergeable node type.
 * @param state Context state.
 */
export declare const consume: (project: Project, direction: Core.Nodes, parent: Core.Node, type: Parser.Nodes, state: Context.State) => void;

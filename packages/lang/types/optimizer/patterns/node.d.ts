import * as Core from '@xcheme/core';
import * as Context from '../context';
import { Project } from '../../core/project';
/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 * @param alias Determines whether or not the node is an alias.
 */
export declare const consume: (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State, alias: boolean) => void;

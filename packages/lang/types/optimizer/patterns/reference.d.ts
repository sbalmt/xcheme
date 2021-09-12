import * as Core from '@xcheme/core';
import * as Context from '../context';
import { Project } from '../../core/project';
/**
 * Consume the specified input node resolving its reference pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export declare const consume: (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State) => void;

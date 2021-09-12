import * as Directive from '../../optimizer/nodes/directive';
import { Project } from '../../core/project';
import { Pointers } from '../context';
/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param directive Directive node.
 * @param pointers Initial context pointers.
 * @param alias Determines whether or not the node is an alias.
 */
export declare const consume: (project: Project, directive: Directive.Node, pointers: Pointers, alias: boolean) => void;

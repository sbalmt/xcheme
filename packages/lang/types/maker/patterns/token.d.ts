import * as Directive from '../../optimizer/nodes/directive';
import { Project } from '../../core/project';
import { Pointers } from '../context';
/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param directive Directive node.
 * @param pointer Initial context pointers.
 * @param alias Determines whether or not the token is an alias.
 */
export declare const consume: (project: Project, directive: Directive.Node, pointers: Pointers, alias: boolean) => void;

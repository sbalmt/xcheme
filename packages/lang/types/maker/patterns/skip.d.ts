import * as Directive from '../../optimizer/nodes/directive';
import { Project } from '../../core/project';
import { Pointers } from '../context';
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param directive Directive node.
 * @param identity Pattern identity.
 * @param pointer Initial context pointers.
 */
export declare const consume: (project: Project, directive: Directive.Node, pointers: Pointers) => void;

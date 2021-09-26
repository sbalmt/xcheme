import * as Directive from '../../optimizer/nodes/directive';
import { Project } from '../../core/project';
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param directive Directive node.
 */
export declare const consume: (project: Project, directive: Directive.Node) => void;

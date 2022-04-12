import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Context from '../../context';
import * as Loose from '../../loose';
import * as Tree from '../../tree';

import * as Expression from '../expression';

/**
 * Consume the given node and optimize the LOOSE pattern.
 * @param project Project context.
 * @param node Loose node.
 * @param identifier Collision identifier.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, identifier: string, state: Context.State): void => {
  const record = Loose.resolve(project, identifier, node, state);
  const reference = Tree.getReference(record.data.identifier, node.fragment.location, node.table);
  Expression.consume(project, reference, state);
  node.swap(reference);
};

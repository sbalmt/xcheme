import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as Reference from './reference';
import * as Mergeable from './mergeable';
import * as String from './string';
import * as Range from './range';
import * as Map from './map';
import * as Access from './access';

/**
 * Consume a child node from the AST on the given parent and optimize the expression pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  switch (node.value) {
    case Parser.Nodes.Any:
    case Parser.Nodes.Range:
      Range.consume(project, direction, parent, state);
      break;
    case Parser.Nodes.Reference:
      Reference.consume(project, direction, parent, state);
      break;
    case Parser.Nodes.String:
      String.consume(project, direction, parent, state);
      break;
    case Parser.Nodes.Map:
      Map.consume(project, direction, parent, state);
      break;
    case Parser.Nodes.Access:
      Access.consume(project, direction, parent, state);
      break;
    case Parser.Nodes.Or:
      Mergeable.consume(project, direction, parent, Parser.Nodes.Or, state);
      break;
    case Parser.Nodes.And:
      Mergeable.consume(project, direction, parent, Parser.Nodes.And, state);
      break;
    default:
      consume(project, Core.Nodes.Right, node, state);
  }
};

import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as Identified from './identified';
import * as Sequential from './sequential';
import * as Reference from './reference';
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
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
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
      Sequential.consume(project, direction, parent, Parser.Nodes.Or, state);
      break;
    case Parser.Nodes.And:
      Sequential.consume(project, direction, parent, Parser.Nodes.And, state);
      break;
    case Parser.Nodes.Append:
    case Parser.Nodes.AppendLeft:
    case Parser.Nodes.AppendNext:
    case Parser.Nodes.AppendRight:
      return Identified.consume(project, direction, parent, state);
    case Parser.Nodes.Prepend:
    case Parser.Nodes.PrependLeft:
    case Parser.Nodes.PrependNext:
    case Parser.Nodes.PrependRight:
      return Identified.consume(project, direction, parent, state);
    case Parser.Nodes.Pivot:
      return Identified.consume(project, direction, parent, state);
    case Parser.Nodes.Symbol:
      return Identified.consume(project, direction, parent, state);
    default:
      consume(project, Core.Nodes.Right, node, state);
  }
};

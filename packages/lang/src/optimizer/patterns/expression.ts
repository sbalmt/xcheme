import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as Range from './range';
import * as Reference from './reference';
import * as String from './string';
import * as Map from './map';
import * as Access from './access';
import * as Generic from './generic';

/**
 * Consume a child node from the AST on the given parent and optimize the corresponding expression pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Types.Node,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  switch (node.value) {
    case Parser.Nodes.Any:
      break;
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
      Generic.Sequence.consume(project, direction, parent, Parser.Nodes.Or, state);
      break;
    case Parser.Nodes.And:
      Generic.Sequence.consume(project, direction, parent, Parser.Nodes.And, state);
      break;
    case Parser.Nodes.Append:
    case Parser.Nodes.AppendLeft:
    case Parser.Nodes.AppendNext:
    case Parser.Nodes.AppendRight:
    case Parser.Nodes.Prepend:
    case Parser.Nodes.PrependLeft:
    case Parser.Nodes.PrependNext:
    case Parser.Nodes.PrependRight:
    case Parser.Nodes.Pivot:
    case Parser.Nodes.Symbol:
      Generic.Identity.consume(project, direction, parent, state);
      break;
    case Parser.Nodes.Error:
    case Parser.Nodes.Has:
    case Parser.Nodes.Set:
      Generic.State.consume(project, direction, parent, state);
      break;
    default:
      consume(project, Core.Nodes.Right, node, state);
  }
};

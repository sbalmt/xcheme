import * as Core from '@xcheme/core';

import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Exception } from '../../core/exception';

import * as Reference from './reference';
import * as String from './string';
import * as Range from './range';
import * as Map from './map';
import * as Access from './access';
import * as Or from './or';
import * as And from './and';
import * as Condition from './condition';
import * as Not from './not';
import * as Option from './option';
import * as Repeat from './repeat';
import * as Place from './place';
import * as Pivot from './pivot';
import * as Append from './append';
import * as Prepend from './prepend';
import * as Symbol from './symbol';
import * as Scope from './scope';
import * as Error from './error';
import * as Has from './has';
import * as Set from './set';
import * as Uncase from './uncase';
import * as Peek from './peek';

/**
 * Consume the given node resolving the expression patterns.
 * @param project Project context.
 * @param node Expression node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  switch (node.value) {
    case Parser.Nodes.Reference:
      return Reference.consume(project, node, state);
    case Parser.Nodes.String:
      return String.consume(project, node, state);
    case Parser.Nodes.Any:
      return project.coder.emitAnyPattern();
    case Parser.Nodes.Range:
      return Range.consume(project, node, state);
    case Parser.Nodes.Map:
      return Map.consume(project, node, state);
    case Parser.Nodes.Access:
      return Access.consume(project, node);
    case Parser.Nodes.Then:
      return Condition.consume(project, node, state);
    case Parser.Nodes.Or:
      return Or.consume(project, node, state);
    case Parser.Nodes.And:
      return And.consume(project, node, state);
    case Parser.Nodes.Not:
      return Not.consume(project, node, state);
    case Parser.Nodes.Opt:
      return Option.consume(project, node, state);
    case Parser.Nodes.Repeat:
      return Repeat.consume(project, node, state);
    case Parser.Nodes.Place:
    case Parser.Nodes.PlaceRight:
      return Place.consume(project, node, state, Core.Nodes.Right);
    case Parser.Nodes.PlaceNext:
      return Place.consume(project, node, state, Core.Nodes.Next);
    case Parser.Nodes.PlaceLeft:
      return Place.consume(project, node, state, Core.Nodes.Left);
    case Parser.Nodes.Append:
    case Parser.Nodes.AppendRight:
      return Append.consume(project, node, state, Core.Nodes.Right);
    case Parser.Nodes.AppendNext:
      return Append.consume(project, node, state, Core.Nodes.Next);
    case Parser.Nodes.AppendLeft:
      return Append.consume(project, node, state, Core.Nodes.Left);
    case Parser.Nodes.Prepend:
    case Parser.Nodes.PrependRight:
      return Prepend.consume(project, node, state, Core.Nodes.Right);
    case Parser.Nodes.PrependNext:
      return Prepend.consume(project, node, state, Core.Nodes.Next);
    case Parser.Nodes.PrependLeft:
      return Prepend.consume(project, node, state, Core.Nodes.Left);
    case Parser.Nodes.Pivot:
      return Pivot.consume(project, node, state);
    case Parser.Nodes.Symbol:
      return Symbol.consume(project, node, state);
    case Parser.Nodes.Scope:
      return Scope.consume(project, node, state);
    case Parser.Nodes.Error:
      return Error.consume(project, node, state);
    case Parser.Nodes.Has:
      return Has.consume(project, node, state);
    case Parser.Nodes.Set:
      return Set.consume(project, node, state);
    case Parser.Nodes.Uncase:
      return Uncase.consume(project, node, state);
    case Parser.Nodes.Peek:
      return Peek.consume(project, node, state);
    default:
      throw new Exception(`Invalid expression type (${node.value}).`);
  }
};

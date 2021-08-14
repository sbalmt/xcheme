import * as Core from '@xcheme/core';

import * as Parser from '../../parser';

import { Errors } from '../../core/errors';
import { Project } from '../common/project';
import { State } from '../common/context';

import type { PatternEntry } from '../coder/base';

import * as Condition from './condition';
import * as Or from './or';
import * as And from './and';
import * as Negate from './not';
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
import * as Reference from './reference';
import * as Range from './range';
import * as Alphabet from './alphabet';

/**
 * Consume the specified input node resolving its expression patterns.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  switch (node.value) {
    case Parser.Nodes.Then:
      return Condition.consume(project, node, state);
    case Parser.Nodes.Or:
      return Or.consume(project, node, state);
    case Parser.Nodes.And:
      return And.consume(project, node, state);
    case Parser.Nodes.Not:
      return Negate.consume(project, node, state);
    case Parser.Nodes.Opt:
      return Option.consume(project, node, state);
    case Parser.Nodes.Rep:
      return Repeat.consume(project, node, state);
    case Parser.Nodes.Pivot:
      return Pivot.consume(project, node, state);
    case Parser.Nodes.Place:
    case Parser.Nodes.PlaceRight:
      return Place.consume(project, node, state, Core.Nodes.Right);
    case Parser.Nodes.Append:
    case Parser.Nodes.AppendRight:
      return Append.consume(project, node, state, Core.Nodes.Right);
    case Parser.Nodes.Prepend:
    case Parser.Nodes.PrependRight:
      return Prepend.consume(project, node, state, Core.Nodes.Right);
    case Parser.Nodes.PlaceNext:
      return Place.consume(project, node, state, Core.Nodes.Next);
    case Parser.Nodes.AppendNext:
      return Append.consume(project, node, state, Core.Nodes.Next);
    case Parser.Nodes.PrependNext:
      return Prepend.consume(project, node, state, Core.Nodes.Next);
    case Parser.Nodes.PlaceLeft:
      return Place.consume(project, node, state, Core.Nodes.Left);
    case Parser.Nodes.AppendLeft:
      return Append.consume(project, node, state, Core.Nodes.Left);
    case Parser.Nodes.PrependLeft:
      return Prepend.consume(project, node, state, Core.Nodes.Left);
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
    case Parser.Nodes.Reference:
      return Reference.consume(project, node, state);
    case Parser.Nodes.Any:
      return project.coder.getAny();
    case Parser.Nodes.Range:
      return Range.consume(project, node, state);
    case Parser.Nodes.Alphabet:
      return Alphabet.consume(project, node, state);
    default:
      project.errors.push(new Core.Error(node.fragment, Errors.UNEXPECTED_NODE));
  }
  return void 0;
};

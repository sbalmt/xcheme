import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';

/**
 * Argument operands pattern.
 */
const ArgumentOperands = new Core.AppendNodePattern(
  Core.Source.Output,
  Core.NodeDirection.Right,
  Core.NodeDirection.Next,
  new Core.MapFlowPattern(
    new Core.SetValueRoute(Nodes.Identity, Lexer.Tokens.Auto),
    new Core.SetValueRoute(Nodes.Identity, Lexer.Tokens.Number)
  )
);

/**
 * Argument reference pattern.
 */
const ArgumentReference = new Core.AppendNodePattern(
  Nodes.Reference,
  Core.NodeDirection.Right,
  Core.NodeDirection.Next,
  new Core.ExpectUnitPattern(Lexer.Tokens.Identifier),
  new Core.OptFlowPattern(new Core.RunFlowPattern(() => Arguments))
);

/**
 * Argument list pattern.
 */
const ArgumentList: Core.Pattern<Core.Types> = new Core.ExpectFlowPattern(
  new Core.ChooseFlowPattern(ArgumentOperands, ArgumentReference),
  new Core.OptFlowPattern(new Core.ExpectUnitPattern(Lexer.Tokens.Comma), new Core.RunFlowPattern(() => ArgumentList))
);

/**
 * Arguments pattern.
 */
export const Arguments = new Core.PrependNodePattern(
  Nodes.Arguments,
  Core.NodeDirection.Left,
  Core.NodeDirection.Next,
  new Core.ExpectFlowPattern(
    new Core.ExpectUnitPattern(Lexer.Tokens.OpenChevron),
    ArgumentList,
    new Core.ExpectUnitPattern(Lexer.Tokens.CloseChevron)
  )
);

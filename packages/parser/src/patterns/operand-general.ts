import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';

/**
 * General operands pattern.
 */
export const GeneralOperands = new Core.AppendNodePattern(
  Core.Source.Output,
  Core.NodeDirection.Right,
  Core.NodeDirection.Right,
  new Core.MapFlowPattern(
    new Core.SetValueRoute(Nodes.Any, Lexer.Tokens.Any),
    new Core.SetValueRoute(Nodes.Any, Lexer.Tokens.Asterisk),
    new Core.SetValueRoute(Nodes.String, Lexer.Tokens.String),
    new Core.SetValueRoute(Nodes.EoS, Lexer.Tokens.EoS)
  )
);

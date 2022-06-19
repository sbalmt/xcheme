import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';

/**
 * Range operand pattern.
 */
export const RangeOperand = new Core.PlaceNodePattern(
  Core.Nodes.Right,
  new Core.ExpectUnitPattern(Lexer.Tokens.From),
  new Core.AppendNodePattern(
    Nodes.String,
    Core.Nodes.Right,
    Core.Nodes.Right,
    new Core.ExpectUnitPattern(Lexer.Tokens.String)
  ),
  new Core.PivotNodePattern(
    Nodes.Range,
    Core.Nodes.Right,
    Core.Nodes.Left,
    new Core.ExpectUnitPattern(Lexer.Tokens.To),
    new Core.AppendNodePattern(
      Nodes.String,
      Core.Nodes.Right,
      Core.Nodes.Right,
      new Core.ExpectUnitPattern(Lexer.Tokens.String)
    )
  )
);

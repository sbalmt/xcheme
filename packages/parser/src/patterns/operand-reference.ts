import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { Arguments } from './arguments';

/**
 * Reference operand pattern.
 */
export const ReferenceOperand = new Core.AppendNodePattern(
  Nodes.Reference,
  Core.Nodes.Right,
  Core.Nodes.Right,
  new Core.ExpectUnitPattern(Lexer.Tokens.Identifier),
  new Core.OptFlowPattern(Arguments)
);

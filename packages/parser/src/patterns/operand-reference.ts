import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { Arguments } from './arguments';

/**
 * Reference operand pattern.
 */
export const ReferenceOperand = new Core.AppendNodePattern(
  Nodes.Reference,
  Core.NodeDirection.Right,
  Core.NodeDirection.Right,
  new Core.ExpectUnitPattern(Lexer.Tokens.Identifier),
  new Core.OptFlowPattern(Arguments)
);

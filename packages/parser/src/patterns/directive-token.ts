import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { Symbols } from '../symbols';
import { Arguments } from './arguments';
import { Expression } from './expression';

import { getDirectiveExpression } from './expression-directive';

/**
 * Token directive route.
 */
export const TokenDirective = new Core.SetValueRoute(
  Nodes.Token,
  getDirectiveExpression(Symbols.Token, Arguments, Expression),
  Lexer.Tokens.Token
);

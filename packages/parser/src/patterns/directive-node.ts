import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { Symbols } from '../symbols';
import { Arguments } from './arguments';
import { Expression } from './expression';

import { getDirectiveExpression } from './expression-directive';

/**
 * Node directive route.
 */
export const NodeDirective = new Core.SetValueRoute(
  Nodes.Node,
  getDirectiveExpression(Symbols.Node, Arguments, Expression),
  Lexer.Tokens.Node
);

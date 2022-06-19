import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { Expression } from './expression';

/**
 * Skip directive route.
 */
export const SkipDirective = new Core.SetValueRoute(Nodes.Skip, Expression, Lexer.Tokens.Skip);

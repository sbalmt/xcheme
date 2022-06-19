import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';

/**
 * Import directive route.
 */
export const ImportDirective = new Core.SetValueRoute(
  Nodes.Import,
  new Core.AppendNodePattern(
    Nodes.String,
    Core.Nodes.Right,
    Core.Nodes.Right,
    new Core.ExpectUnitPattern(Lexer.Tokens.String)
  ),
  Lexer.Tokens.Import
);

import * as Core from '@xcheme/core';

import { Tokens } from '../tokens';

/**
 * All symbols pattern.
 */
export const Symbol = new Core.MapFlowPattern(
  new Core.SetValueRoute(Tokens.Asterisk, '*'),
  new Core.SetValueRoute(Tokens.VerticalBar, '|'),
  new Core.SetValueRoute(Tokens.Ampersand, '&'),
  new Core.SetValueRoute(Tokens.Period, '.'),
  new Core.SetValueRoute(Tokens.Comma, ','),
  new Core.SetValueRoute(Tokens.Semicolon, ';'),
  new Core.SetValueRoute(Tokens.OpenBraces, '{'),
  new Core.SetValueRoute(Tokens.CloseBraces, '}'),
  new Core.SetValueRoute(Tokens.OpenParenthesis, '('),
  new Core.SetValueRoute(Tokens.CloseParenthesis, ')'),
  new Core.SetValueRoute(Tokens.OpenChevron, '<'),
  new Core.SetValueRoute(Tokens.CloseChevron, '>')
);

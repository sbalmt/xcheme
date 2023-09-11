import * as Core from '@xcheme/core';

import { Tokens } from '../tokens';

import { Character } from './character';

/**
 * Word boundary pattern.
 */
const NotCharacter = new Core.NotFlowPattern(Character);

/**
 * All keywords pattern.
 */
export const Keyword = new Core.MapFlowPattern(
  new Core.SetValueRoute(Tokens.Any, NotCharacter, 'a', 'n', 'y'),
  new Core.SetValueRoute(Tokens.From, NotCharacter, 'f', 'r', 'o', 'm'),
  new Core.SetValueRoute(Tokens.To, NotCharacter, 't', 'o'),
  new Core.SetValueRoute(Tokens.Map, NotCharacter, 'm', 'a', 'p'),
  new Core.SetValueRoute(Tokens.EoS, NotCharacter, 'e', 'o', 's'),
  new Core.SetValueRoute(Tokens.Then, NotCharacter, 't', 'h', 'e', 'n'),
  new Core.SetValueRoute(Tokens.Else, NotCharacter, 'e', 'l', 's', 'e'),
  new Core.SetValueRoute(Tokens.Or, NotCharacter, 'o', 'r'),
  new Core.SetValueRoute(Tokens.And, NotCharacter, 'a', 'n', 'd'),
  new Core.SetValueRoute(Tokens.Not, NotCharacter, 'n', 'o', 't'),
  new Core.SetValueRoute(Tokens.Opt, NotCharacter, 'o', 'p', 't'),
  new Core.SetValueRoute(Tokens.Repeat, NotCharacter, 'r', 'e', 'p', 'e', 'a', 't'),
  new Core.SetValueRoute(Tokens.Place, NotCharacter, 'p', 'l', 'a', 'c', 'e'),
  new Core.SetValueRoute(Tokens.Append, NotCharacter, 'a', 'p', 'p', 'e', 'n', 'd'),
  new Core.SetValueRoute(Tokens.Prepend, NotCharacter, 'p', 'r', 'e', 'p', 'e', 'n', 'd'),
  new Core.SetValueRoute(Tokens.Pivot, NotCharacter, 'p', 'i', 'v', 'o', 't'),
  new Core.SetValueRoute(Tokens.Next, NotCharacter, 'n', 'e', 'x', 't'),
  new Core.SetValueRoute(Tokens.Left, NotCharacter, 'l', 'e', 'f', 't'),
  new Core.SetValueRoute(Tokens.Right, NotCharacter, 'r', 'i', 'g', 'h', 't'),
  new Core.SetValueRoute(Tokens.Symbol, NotCharacter, 's', 'y', 'm', 'b', 'o', 'l'),
  new Core.SetValueRoute(Tokens.Scope, NotCharacter, 's', 'c', 'o', 'p', 'e'),
  new Core.SetValueRoute(Tokens.Use, NotCharacter, 'u', 's', 'e'),
  new Core.SetValueRoute(Tokens.Error, NotCharacter, 'e', 'r', 'r', 'o', 'r'),
  new Core.SetValueRoute(Tokens.Warn, NotCharacter, 'w', 'a', 'r', 'n'),
  new Core.SetValueRoute(Tokens.Has, NotCharacter, 'h', 'a', 's'),
  new Core.SetValueRoute(Tokens.Set, NotCharacter, 's', 'e', 't'),
  new Core.SetValueRoute(Tokens.Uncase, NotCharacter, 'u', 'n', 'c', 'a', 's', 'e'),
  new Core.SetValueRoute(Tokens.Peek, NotCharacter, 'p', 'e', 'e', 'k'),
  new Core.SetValueRoute(Tokens.Skip, NotCharacter, 's', 'k', 'i', 'p'),
  new Core.SetValueRoute(Tokens.Token, NotCharacter, 't', 'o', 'k', 'e', 'n'),
  new Core.SetValueRoute(Tokens.Node, NotCharacter, 'n', 'o', 'd', 'e'),
  new Core.SetValueRoute(Tokens.Alias, NotCharacter, 'a', 'l', 'i', 'a', 's'),
  new Core.SetValueRoute(Tokens.Auto, NotCharacter, 'a', 'u', 't', 'o'),
  new Core.SetValueRoute(Tokens.As, NotCharacter, 'a', 's'),
  new Core.SetValueRoute(Tokens.Import, NotCharacter, 'i', 'm', 'p', 'o', 'r', 't'),
  new Core.SetValueRoute(Tokens.Export, NotCharacter, 'e', 'x', 'p', 'o', 'r', 't')
);

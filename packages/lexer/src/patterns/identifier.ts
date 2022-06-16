import * as Core from '@xcheme/core';

import { Tokens } from '../tokens';

import { CharacterAlpha } from './character-alpha';
import { CharacterExtra } from './character-extra';
import { Character } from './character';

/**
 * Identifier pattern.
 */
export const Identifier = new Core.SetValuePattern(
  Tokens.Identifier,
  new Core.ChooseFlowPattern(CharacterAlpha, CharacterExtra),
  new Core.OptFlowPattern(new Core.RepeatFlowPattern(Character))
);

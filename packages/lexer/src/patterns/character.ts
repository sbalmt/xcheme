import * as Core from '@xcheme/core';

import { CharacterAlpha } from './character-alpha';
import { CharacterDigit } from './character-digit';
import { CharacterExtra } from './character-extra';

/**
 * All characters pattern.
 */
export const Character = new Core.ChooseFlowPattern(CharacterAlpha, CharacterDigit, CharacterExtra);

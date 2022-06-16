import * as Core from '@xcheme/core';

import { Tokens } from '../tokens';

import { CharacterDigit } from './character-digit';

/**
 * Integer number pattern.
 */
export const Integer = new Core.SetValuePattern(
  Tokens.Number,
  new Core.ChooseFlowPattern(
    new Core.ExpectUnitPattern('0'),
    new Core.ExpectFlowPattern(
      new Core.RangeUnitPattern('1', '9'),
      new Core.OptFlowPattern(new Core.RepeatFlowPattern(CharacterDigit))
    )
  )
);

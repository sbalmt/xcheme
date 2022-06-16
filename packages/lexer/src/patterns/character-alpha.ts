import * as Core from '@xcheme/core';

/**
 * Alpha characters pattern.
 */
export const CharacterAlpha = new Core.ChooseFlowPattern(
  new Core.RangeUnitPattern('a', 'z'),
  new Core.RangeUnitPattern('A', 'Z')
);

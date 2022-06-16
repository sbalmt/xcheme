import * as Core from '@xcheme/core';

import { Tokens } from '../tokens';

/**
 * Single quoted string pattern.
 */
export const String = new Core.SetValuePattern(
  Tokens.String,
  new Core.ExpectUnitPattern("'"),
  new Core.RepeatFlowPattern(
    new Core.ConditionFlowPattern(
      new Core.ExpectUnitPattern('\\'),
      new Core.AnyUnitPattern(),
      new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern("'")), new Core.AnyUnitPattern())
    )
  ),
  new Core.ExpectUnitPattern("'")
);

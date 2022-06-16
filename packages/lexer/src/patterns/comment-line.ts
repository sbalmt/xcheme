import * as Core from '@xcheme/core';

/**
 * Comment-line pattern.
 */
export const CommentLine = new Core.ExpectFlowPattern(
  new Core.ExpectUnitPattern('/', '/'),
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ConditionFlowPattern(
        new Core.NotFlowPattern(new Core.ExpectUnitPattern('\n')),
        new Core.AnyUnitPattern()
      )
    )
  )
);

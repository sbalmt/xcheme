import * as Core from '@xcheme/core';

/**
 * Comment-block pattern.
 */
export const CommentBlock = new Core.ExpectFlowPattern(
  new Core.ExpectUnitPattern('/', '*'),
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ConditionFlowPattern(
        new Core.NotFlowPattern(new Core.ExpectUnitPattern('*', '/')),
        new Core.AnyUnitPattern()
      )
    )
  ),
  new Core.ExpectUnitPattern('*', '/')
);

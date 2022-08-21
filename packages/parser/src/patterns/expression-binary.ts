import * as Core from '@xcheme/core';

/**
 * Get a new binary expression pattern for the given parameters.
 * @param operator Expression operator.
 * @param expression Preceded expression.
 * @returns Returns the generated pattern.
 */
export const getBinaryExpression = <T extends Core.Types>(
  operator: Core.Pattern<T>,
  expression: Core.Pattern<T>
): Core.Pattern<T> =>
  new Core.ExpectFlowPattern(
    expression,
    new Core.OptFlowPattern(
      new Core.RepeatFlowPattern(
        new Core.PivotNodePattern(
          Core.Source.Output,
          Core.NodeDirection.Right,
          Core.NodeDirection.Left,
          operator,
          expression
        )
      )
    )
  );

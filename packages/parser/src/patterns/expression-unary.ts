import * as Core from '@xcheme/core';

/**
 * Get a new unary expression pattern for the given parameters.
 * @param operator Expression operator.
 * @param expression Preceded expression.
 * @returns Returns the generated pattern.
 */
export const getUnaryExpression = <T extends Core.Types>(
  operator: Core.Pattern<T>,
  expression: Core.Pattern<T>
): Core.Pattern<T> =>
  new Core.ExpectFlowPattern(
    new Core.OptFlowPattern(
      new Core.RepeatFlowPattern(
        new Core.AppendNodePattern(Core.Source.Output, Core.NodeDirection.Right, Core.NodeDirection.Right, operator)
      )
    ),
    expression
  );

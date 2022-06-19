import * as Core from '@xcheme/core';

/**
 * Get a new unary expression pattern for the given parameters.
 * @param operator Expression operator.
 * @param expression Preceded expression.
 * @returns Returns the generated pattern.
 */
export const getUnaryExpression = <T extends Core.Metadata.Types>(
  operator: Core.Pattern<T>,
  expression: Core.Pattern<T>
): Core.Pattern<T> =>
  new Core.ExpectFlowPattern(
    new Core.OptFlowPattern(
      new Core.RepeatFlowPattern(
        new Core.AppendNodePattern(Core.Source.Output, Core.Nodes.Right, Core.Nodes.Right, operator)
      )
    ),
    expression
  );

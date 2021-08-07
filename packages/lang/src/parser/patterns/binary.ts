import * as Core from '@xcheme/core';

/**
 * Binary expression pattern.
 */
export default class Binary extends Core.Pattern {
  /**
   * Binary pattern.
   */
  #pattern: Core.Pattern;

  /**
   * Default constructor.
   * @param operator Binary operator.
   * @param expression Expression pattern.
   */
  constructor(operator: Core.Pattern, expression: Core.Pattern) {
    super();
    this.#pattern = new Core.ExpectFlowPattern(
      expression,
      new Core.OptionFlowPattern(
        new Core.RepeatFlowPattern(
          new Core.PivotNodePattern(Core.BaseSource.Output, Core.Nodes.Right, Core.Nodes.Left, operator, expression)
        )
      )
    );
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Core.BaseSource): boolean {
    return this.#pattern.consume(source);
  }
}

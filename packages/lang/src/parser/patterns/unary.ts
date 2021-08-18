import * as Core from '@xcheme/core';

/**
 * Prefixed unary expression pattern.
 */
export default class Unary extends Core.Pattern {
  /**
   * Unary pattern.
   */
  #pattern: Core.Pattern;

  /**
   * Default constructor.
   * @param operator Unary operator.
   * @param expression Expression pattern.
   */
  constructor(operator: Core.Pattern, expression: Core.Pattern) {
    super();
    this.#pattern = new Core.ExpectFlowPattern(
      new Core.OptFlowPattern(
        new Core.RepeatFlowPattern(new Core.AppendNodePattern(Core.BaseSource.Output, Core.Nodes.Right, Core.Nodes.Right, operator))
      ),
      expression
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

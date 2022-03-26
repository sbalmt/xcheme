import * as Core from '@xcheme/core';

import * as Types from '../../core/types';

/**
 * Prefixed unary expression pattern.
 */
export default class Unary extends Core.Pattern<Types.Metadata> {
  /**
   * Unary pattern.
   */
  #pattern: Types.Pattern;

  /**
   * Default constructor.
   * @param operator Unary operator pattern.
   * @param expression Expression pattern.
   */
  constructor(operator: Types.Pattern, expression: Types.Pattern) {
    super();
    this.#pattern = new Core.ExpectFlowPattern(
      new Core.OptFlowPattern(
        new Core.RepeatFlowPattern(
          new Core.AppendNodePattern(Core.Source.Output, Core.Nodes.Right, Core.Nodes.Right, operator)
        )
      ),
      expression
    );
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Types.Source): boolean {
    return this.#pattern.consume(source);
  }
}

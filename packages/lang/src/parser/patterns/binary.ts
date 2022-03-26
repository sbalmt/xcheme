import * as Types from '../../core/types';

import * as Core from '@xcheme/core';

/**
 * Binary expression pattern.
 */
export default class Binary extends Core.Pattern<Types.Metadata> {
  /**
   * Binary pattern.
   */
  #pattern: Types.Pattern;

  /**
   * Default constructor.
   * @param operator Binary operator pattern.
   * @param expression Expression pattern.
   */
  constructor(operator: Types.Pattern, expression: Types.Pattern) {
    super();
    this.#pattern = new Core.ExpectFlowPattern(
      expression,
      new Core.OptFlowPattern(
        new Core.RepeatFlowPattern(
          new Core.PivotNodePattern(Core.Source.Output, Core.Nodes.Right, Core.Nodes.Left, operator, expression)
        )
      )
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

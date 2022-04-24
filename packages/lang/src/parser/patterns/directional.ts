import * as Core from '@xcheme/core';

import * as Lexer from '../../lexer';
import * as Types from '../../core/types';

import { Nodes } from '../nodes';

/**
 * Directional expression pattern.
 */
export default class Directional extends Core.Pattern<Types.Metadata> {
  /**
   * Expression pattern.
   */
  #pattern: Types.Pattern;

  /**
   * Default constructor.
   * @param expression Expression pattern.
   * @param ready Ready route value.
   * @param left Left route value.
   * @param right Right route value.
   * @param next Next route value.
   */
  constructor(expression: Types.Pattern, ready: Nodes, left: Nodes, right: Nodes, next: Nodes) {
    super();
    this.#pattern = new Core.ExpectFlowPattern(
      new Core.OptFlowPattern(expression),
      new Core.UseValuePattern(
        ready,
        new Core.OptFlowPattern(
          new Core.MapFlowPattern(
            new Core.SetValueRoute(left, Lexer.Tokens.Left),
            new Core.SetValueRoute(right, Lexer.Tokens.Right),
            new Core.SetValueRoute(next, Lexer.Tokens.Next)
          )
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

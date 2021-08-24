import * as Core from '@xcheme/core';
import * as Lexer from '../../lexer';

import { Symbols } from '../symbols';
import { Nodes } from '../nodes';

/**
 * Directive pattern
 */
export default class Directive extends Core.Pattern {
  /**
   * Directive pattern.
   */
  #pattern: Core.Pattern;

  /**
   * Default constructor.
   * @param symbol Symbol value.
   * @param identity Identity pattern.
   * @param expression Expression pattern.
   */
  constructor(symbol: Symbols, identity: Core.Pattern, expression: Core.Pattern) {
    super();
    this.#pattern = new Core.ExpectFlowPattern(
      new Core.OptFlowPattern(identity),
      new Core.EmitSymbolPattern(
        symbol,
        new Core.PivotNodePattern(
          Nodes.Identifier,
          Core.Nodes.Right,
          Core.Nodes.Left,
          new Core.ExpectUnitPattern(Lexer.Tokens.Identifier)
        ),
        new Core.ExpectUnitPattern(Lexer.Tokens.As),
        new Core.PlaceNodePattern(Core.Nodes.Right, expression)
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

import Range from './range';

/**
 * Data location class.
 */
export default class Location {
  /**
   * Location name.
   */
  #name: string;

  /**
   * Line range.
   */
  #line: Range;

  /**
   * Column range.
   */
  #column: Range;

  /**
   * Default constructor.
   * @param name Location name.
   * @param line Line range.
   * @param column Column range.
   */
  constructor(name: string, line: Range, column: Range) {
    this.#name = name;
    this.#line = line;
    this.#column = column;
  }

  /**
   * Get the location name.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Get the line range.
   */
  get line(): Range {
    return this.#line;
  }

  /**
   * Get the column range.
   */
  get column(): Range {
    return this.#column;
  }
}

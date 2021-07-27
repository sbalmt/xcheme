/**
 * A fragment location in terms of lines and columns.
 */
export default class Location {
  /**
   * Location line.
   */
  #line: number;

  /**
   * Location column.
   */
  #column: number;

  /**
   * Default constructor.
   * @param line Location line.
   * @param column Location column.
   */
  constructor(line: number, column: number) {
    this.#line = line;
    this.#column = column;
  }

  /**
   * Get the location line.
   */
  get line(): number {
    return this.#line;
  }

  /**
   * Get the location column.
   */
  get column(): number {
    return this.#column;
  }
}

/**
 * A fragment location in terms of lines and columns.
 */
export default class Location {
  /**
   * Location name.
   */
  #name: string;

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
   * @param name Location name.
   * @param line Location line.
   * @param column Location column.
   */
  constructor(name: string, line: number, column: number) {
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

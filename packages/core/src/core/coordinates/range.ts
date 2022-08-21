/**
 * Data location range class.
 */
export class Range {
  /**
   * Range begin.
   */
  #begin: number;

  /**
   * Range end.
   */
  #end: number;

  /**
   * Default constructor.
   * @param begin Range begin.
   * @param end Range end.
   */
  constructor(begin: number, end: number) {
    this.#begin = begin;
    this.#end = end;
  }

  /**
   * Get the range begin.
   */
  get begin(): number {
    return this.#begin;
  }

  /**
   * Get the range end.
   */
  get end(): number {
    return this.#end;
  }

  /**
   * Get the range length.
   */
  get length(): number {
    return this.#end - this.#begin;
  }
}

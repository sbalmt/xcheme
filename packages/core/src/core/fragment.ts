import type Location from './location';

/**
 * A data fragment with its precise location.
 */
export default class Fragment {
  /**
   * Fragment source.
   */
  #source: string;

  /**
   * Beginning of the fragment offset.
   */
  #begin: number;

  /**
   * End of the fragment offset
   */
  #end: number;

  /**
   * Fragment location.
   */
  #location: Location;

  /**
   * Default constructor.
   * @param source Fragment source.
   * @param offset Fragment offset.
   * @param length Fragment length.
   * @param location Fragment location.
   */
  constructor(source: string, begin: number, end: number, location: Location) {
    this.#source = source;
    this.#begin = begin;
    this.#end = end;
    this.#location = location;
  }

  /**
   * Get the fragment source.
   */
  get source(): string {
    return this.#source;
  }

  /**
   * Get the fragment data.
   */
  get data(): string {
    return this.#source.substring(this.#begin, this.#end);
  }

  /**
   * Get the beginning of the fragment offset.
   */
  get begin(): number {
    return this.#begin;
  }

  /**
   * Get the end of the fragment offset.
   */
  get end(): number {
    return this.#end;
  }

  /**
   * Get the fragment length.
   */
  get length(): number {
    return this.#end - this.#begin;
  }

  /**
   * Get the fragment location in terms of lines and columns.
   */
  get location(): Location {
    return this.#location;
  }
}

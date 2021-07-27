import type Location from './location';

/**
 * A data fragment with its precise location.
 */
export default class Fragment {
  /**
   * Fragment data.
   */
  #data: string;

  /**
   * Beginning of fragment offset.
   */
  #begin: number;

  /**
   * End of fragment offset
   */
  #end: number;

  /**
   * Fragment location.
   */
  #location: Location;

  /**
   * Default constructor.
   * @param data Fragment data.
   * @param offset Fragment offset.
   * @param length Fragment length.
   * @param location Fragment location.
   */
  constructor(data: string, begin: number, end: number, location: Location) {
    this.#data = data;
    this.#begin = begin;
    this.#end = end;
    this.#location = location;
  }

  /**
   * Get the fragment data.
   */
  get data(): string {
    return this.#data.substring(this.#begin, this.#end);
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
   * Get the fragment location in terms of lines and columns.
   */
  get location(): Location {
    return this.#location;
  }
}

import type { Location } from './location';

/**
 * Data fragment with its precise location.
 */
export class Fragment {
  /**
   * Fragment source.
   */
  #source: string;

  /**
   * Begin of the fragment offset.
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
   * @param begin Fragment begin.
   * @param end Fragment end.
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
   * Get the begin of the fragment offset.
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
   * Get the fragment location.
   */
  get location(): Location {
    return this.#location;
  }
}

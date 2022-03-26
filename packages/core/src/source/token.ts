import type Context from '../core/context';

import Token from '../core/token';
import Fragment from '../core/fragment';
import Location from '../core/location';
import Range from '../core/range';
import Base from './base';

/**
 * Internal source state.
 */
type State = {
  /**
   * Offset state.
   */
  offset: number;
};

/**
 * Data source for processing tokens during the analysis.
 */
export default class TokenSource<R extends object> extends Base<R> {
  /**
   * Source data.
   */
  #data: Token[];

  /**
   * Source states.
   */
  #states: State[] = [];

  /**
   * Current source state.
   */
  #current: State = { offset: 0 };

  /**
   * Longest source state.
   */
  #longest: State = { ...this.#current };

  /**
   * Default constructor.
   * @param data Source data.
   * @param context Source context.
   */
  constructor(data: Token[], context: Context<R>) {
    super(context);
    this.#data = data;
  }

  /**
   * Get the current source offset.
   */
  get offset(): number {
    return this.#current.offset;
  }

  /**
   * Get the current source length.
   */
  get length(): number {
    return this.#data.length - this.offset;
  }

  /**
   * Get the current source value.
   * @throws Throws an error when the source is empty.
   */
  get value(): string | number {
    const value = this.#data[this.offset];
    if (!value) {
      throw "There's no value to get.";
    }
    return value.value;
  }

  /**
   * Get the current source fragment.
   */
  get fragment(): Fragment {
    if (this.#states.length > 0) {
      const state = this.#states[this.#states.length - 1];
      if (this.offset > state.offset) {
        const first = this.#data[state.offset].fragment;
        const last = this.#data[Math.max(0, this.offset - 1)].fragment;
        const line = new Range(first.location.line.begin, last.location.line.end);
        const column = new Range(first.location.column.begin, last.location.column.end);
        const location = new Location(first.location.name, line, column);
        return new Fragment(first.source, first.begin, last.end, location);
      }
    }
    const offset = Math.min(this.offset, this.#data.length - 1);
    return this.#data[offset].fragment;
  }

  /**
   * Get the current state.
   */
  get currentState(): State {
    return this.#current;
  }

  /**
   * Get the longest state.
   */
  get longestState(): State {
    return this.#longest;
  }

  /**
   * Save the current source state.
   */
  save(): void {
    this.#states.push({ ...this.#current });
  }

  /**
   * Restore the previous source state.
   * @throws Throws an error when there's no state to restore.
   */
  restore(): void {
    if (!(this.#current = this.#states[this.#states.length - 1])) {
      throw "There's no state to restore.";
    }
  }

  /**
   * Discard the current source state.
   */
  discard(): void {
    this.#states.pop();
  }

  /**
   * Move to the next source state.
   */
  next(): void {
    this.#current.offset++;
    if (this.#current.offset > this.#longest.offset) {
      this.#longest = { ...this.#current };
    }
  }
}

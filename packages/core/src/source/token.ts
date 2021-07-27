import type Context from '../core/context';

import Token from '../core/token';
import Fragment from '../core/fragment';
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
export default class TokenSource extends Base {
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
  #state: State = { offset: 0 };

  /**
   * Default constructor.
   * @param data Source data.
   * @param context Source context.
   */
  constructor(data: Token[], context: Context) {
    super(context);
    this.#data = data;
  }

  /**
   * Get the current source offset.
   */
  get offset(): number {
    return this.#state.offset;
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
    if (value === void 0) {
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
      const first = this.#data[state.offset].fragment;
      const last = this.#data[Math.max(0, this.offset - 1)].fragment;
      return new Fragment(first.data, first.begin, last.end, first.location);
    }
    const offset = Math.min(this.offset, this.#data.length - 1);
    return this.#data[offset].fragment;
  }

  /**
   * Save the current source state.
   */
  saveState(): void {
    this.#states.push({ ...this.#state });
  }

  /**
   * Restore the previous source state.
   * @throws Throws an error when there's no state to restore.
   */
  restoreState(): void {
    if ((this.#state = this.#states[this.#states.length - 1]) === void 0) {
      throw "There's no state to restore.";
    }
  }

  /**
   * Discard the current source state.
   */
  discardState(): void {
    this.#states.pop();
  }

  /**
   * Move to the next source state.
   */
  move(): void {
    this.#state.offset++;
  }
}

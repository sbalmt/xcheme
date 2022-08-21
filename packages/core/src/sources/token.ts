import type { Types } from '../core/types';
import type Context from '../core/context';

import { Fragment, Location, Range } from '../core/coordinates';
import { TokenList } from '../core/tokens';
import { Source } from './source';

import Exception from '../core/exception';

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
export class TokenSource<T extends Types> extends Source<T> {
  /**
   * Source tokens.
   */
  #tokens: TokenList<T>;

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
   * @param tokens Source tokens.
   * @param context Source context.
   */
  constructor(tokens: TokenList<T>, context: Context<T>) {
    super(context);
    this.#tokens = tokens;
  }

  /**
   * Get the current source offset.
   */
  get offset(): number {
    return this.#current.offset;
  }

  /**
   * Get the available source length.
   */
  get length(): number {
    return this.#tokens.length - this.offset;
  }

  /**
   * Get the current source value.
   * @throws Throws an error when the source is empty.
   */
  get value(): string | number {
    const token = this.#tokens.at(this.offset);
    if (!token) {
      throw new Exception(`There's no token to get.`);
    }
    return token.value;
  }

  /**
   * Get the current source fragment.
   */
  get fragment(): Fragment {
    if (this.#states.length > 0) {
      const state = this.#states[this.#states.length - 1];
      if (this.offset > state.offset) {
        const first = this.#tokens.at(state.offset)!.fragment;
        const last = this.#tokens.at(this.offset - 1)!.fragment;
        const line = new Range(first.location.line.begin, last.location.line.end);
        const column = new Range(first.location.column.begin, last.location.column.end);
        const location = new Location(first.location.name, line, column);
        return new Fragment(first.source, first.begin, last.end, location);
      }
    }
    const offset = Math.min(this.offset, this.#tokens.length - 1);
    return this.#tokens.get(offset).fragment;
  }

  /**
   * Get the current state.
   */
  get currentState(): State {
    return this.#current;
  }

  /**
   * Get the current longest state.
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
      throw new Exception(`There's no state to restore.`);
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
    if (!this.#tokens.has(this.#current.offset)) {
      throw new Exception(`Token at index ${this.#current.offset} not found.`);
    }
    this.#current.offset++;
    if (this.#current.offset > this.#longest.offset) {
      Object.assign(this.#longest, this.#current);
    }
  }
}

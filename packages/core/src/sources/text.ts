import type { Types } from '../core/types';
import type { Context } from '../core/context';

import { Fragment, Location, Range } from '../core/coordinates';
import { Exception } from '../core/exception';
import { Source } from './source';

/**
 * Internal source state.
 */
type State = {
  /**
   * Line state.
   */
  line: number;

  /**
   * Column state.
   */
  column: number;

  /**
   * Offset state.
   */
  offset: number;
};

/**
 * Data source for processing text during the analysis process.
 */
export class TextSource<T extends Types> extends Source<T> {
  /**
   * Source text.
   */
  #text: string;

  /**
   * Source states.
   */
  #states: State[] = [];

  /**
   * Current source state.
   */
  #current: State = { line: 0, column: 0, offset: 0 };

  /**
   * Longest source state.
   */
  #longest: State = { ...this.#current };

  /**
   * Default constructor.
   * @param text Source text.
   * @param context Source context.
   */
  constructor(text: string, context: Context<T>) {
    super(context);
    this.#text = text;
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
    return this.#text.length - this.offset;
  }

  /**
   * Get the current source value.
   * @throws Throws an error when the source is empty.
   */
  get value(): string {
    const value = this.#text[this.offset];
    if (!value) {
      throw new Exception(`There's no character to get.`);
    }
    return value;
  }

  /**
   * Get the current source fragment.
   * If there are pushed states, the fragment length will be based in the current and the previous pushed state.
   */
  get fragment(): Fragment {
    if (this.#states.length > 0) {
      const state = this.#states[this.#states.length - 1];
      if (this.offset > state.offset) {
        const line = new Range(state.line, this.#current.line);
        const column = new Range(state.column, this.#current.column);
        const location = new Location(this.name, line, column);
        return new Fragment(this.#text, state.offset, this.offset, location);
      }
    }
    const line = new Range(this.#current.line, this.#current.line);
    const column = new Range(this.#current.column, this.#current.column);
    const location = new Location(this.name, line, column);
    const length = this.offset + (this.length > 0 ? 1 : 0);
    return new Fragment(this.#text, this.offset, length, location);
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
    if (this.value !== '\n') {
      this.#current.column++;
    } else {
      this.#current.column = 0;
      this.#current.line++;
    }
    this.#current.offset++;
    if (this.#current.offset > this.#longest.offset) {
      Object.assign(this.#longest, this.#current);
    }
  }
}

import type { Fragment } from '../coordinates';

import { List, ReadOnlyList } from '../collections';
import { Error } from './error';

/**
 * Error list class.
 */
export class ErrorList extends List<Error> {
  /**
   * Construct and add a new error for the given fragment and value.
   * @param fragment Error fragment.
   * @param value Error value.
   * @returns Returns the new error.
   */
  emplace(fragment: Fragment, value: number): Error {
    const error = new Error(fragment, value);
    this.insert(error);
    return error;
  }
}

/**
 * Read-only error list class.
 */
export class ReadOnlyErrorList extends ReadOnlyList<Error> {}

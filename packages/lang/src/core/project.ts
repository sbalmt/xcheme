import * as Core from '@xcheme/core';

import * as Entries from './entries';

import { Base, ReferenceEntry, PatternEntry } from '../maker/coder/base';

/**
 * Project options.
 */
export type Options = {
  /**
   * Initial identity for tokens, nodes and symbols.
   */
  initialIdentity?: number;
};

/**
 * Store all the project entries, errors and options during the making process.
 */
export class Project {
  /**
   * Project coder.
   */
  #coder: Base;

  /**
   * Project options.
   */
  #options: Options;

  /**
   * Project errors.
   */
  #errors: Core.Error[] = [];

  /**
   * Skip entries.
   */
  #skipEntries = new Entries.Aggregator();

  /**
   * Token entries.
   */
  #tokenEntries = new Entries.Aggregator();

  /**
   * Node entries.
   */
  #nodeEntries = new Entries.Aggregator();

  /**
   * Get an array of patterns from the the specified entries.
   * @param entries Patterns entry.
   * @returns Returns the array of patterns.
   */
  #getPatterns(entries: Entries.Entry[]): PatternEntry[] {
    return entries.filter((entry) => entry.pattern !== void 0).map((entry) => entry.pattern!);
  }

  /**
   * Get an array of references from the specified entries.
   * @param entries References entries.
   * @returns Returns the array of references.
   */
  #getReferences(entries: Entries.Entry[]): ReferenceEntry[] {
    return entries
      .filter((entry) => entry.pattern !== void 0)
      .map((entry) => ({
        name: entry.identifier,
        pattern: entry.pattern!
      }));
  }

  /**
   * Default constructor.
   * @param coder Project coder.
   * @param options Project options.
   */
  constructor(coder: Base, options: Options = {}) {
    this.#coder = coder;
    this.#options = options;
  }

  /**
   * Get the project coder.
   */
  get coder(): Base {
    return this.#coder;
  }

  /**
   * Get the project options.
   */
  get options(): Options {
    return this.#options;
  }

  /**
   * Get the project errors.
   */
  get errors(): Core.Error[] {
    return this.#errors;
  }

  /**
   * Get the skip entries aggregator.
   */
  get skipEntries(): Entries.Aggregator {
    return this.#skipEntries;
  }

  /**
   * Get the token entries aggregator.
   */
  get tokenEntries(): Entries.Aggregator {
    return this.#tokenEntries;
  }

  /**
   * Get the node entries aggregator.
   */
  get nodeEntries(): Entries.Aggregator {
    return this.#nodeEntries;
  }

  /**
   * Get the resulting lexer.
   */
  get lexer(): string | Core.Pattern {
    return this.#coder.getEntry('Lexer', this.#getReferences(this.#tokenEntries.referencePatterns), [
      ...this.#getPatterns(this.#skipEntries.patterns),
      ...this.#getPatterns(this.#tokenEntries.patterns)
    ]);
  }

  /**
   * Get the resulting parser.
   */
  get parser(): string | Core.Pattern {
    return this.#coder.getEntry(
      'Parser',
      this.#getReferences(this.#nodeEntries.referencePatterns),
      this.#getPatterns(this.#nodeEntries.patterns)
    );
  }
}

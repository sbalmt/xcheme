import * as Core from '@xcheme/core';

import * as String from './string';
import * as Entries from './entries';

import { Base, PointerEntry, PatternEntry, RouteEntry } from '../coder/base';

/**
 * Project options.
 */
export type Options = {
  /**
   * Initial identity number for tokens, nodes and symbols.
   */
  initialIdentity?: number;
};

/**
 * Store the project entries, errors and options during the making process.
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
   * Token pointer entries.
   */
  #tokenPointerEntries = new Entries.Aggregator();

  /**
   * Node entries.
   */
  #nodeEntries = new Entries.Aggregator();

  /**
   * Node pointer entries.
   */
  #nodePointerEntries = new Entries.Aggregator();

  /**
   * Get an array of patterns from the the specified patterns entry aggregator.
   * @param entries Patterns entry aggregator.
   * @returns Returns the array of patterns.
   */
  #getPatterns(entries: Entries.Entry[]): PatternEntry[] {
    return entries.map((entry) => entry.pattern);
  }

  /**
   * Get an array of routes from the specified patterns entry aggregator.
   * @param entries Patterns entry aggregator.
   * @returns Returns the array of routes.
   */
  #getRoutes(entries: Entries.Entry[]): RouteEntry[] {
    return entries.map((entry) => this.#coder.getRoute(entry.identity, String.extract(entry.name).split('')));
  }

  /**
   * Get an array of pointers entry from the patterns of the specified pointers entry aggregator.
   * @param entries Pointers entries aggregator.
   * @returns Returns the array of pointers entry.
   */
  #getPointers(entries: Entries.Aggregator): PointerEntry[] {
    return entries.patterns.map((entry) => ({
      name: entry.name,
      pattern: entry.pattern
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
   * Get the skip entries.
   */
  get skipEntries(): Entries.Aggregator {
    return this.#skipEntries;
  }

  /**
   * Get the token entries.
   */
  get tokenEntries(): Entries.Aggregator {
    return this.#tokenEntries;
  }

  /**
   * Get the token pointer entries.
   */
  get tokenPointerEntries(): Entries.Aggregator {
    return this.#tokenPointerEntries;
  }

  /**
   * Get the node entries.
   */
  get nodeEntries(): Entries.Aggregator {
    return this.#nodeEntries;
  }

  /**
   * Get the node pointer entries.
   */
  get nodePointerEntries(): Entries.Aggregator {
    return this.#nodePointerEntries;
  }

  /**
   * Get the resulting lexer.
   */
  get lexer(): string | Core.Pattern {
    const routes = this.#getRoutes(this.#tokenEntries.loosePatterns);
    return this.#coder.getEntry(
      'Lexer',
      this.#getPointers(this.#tokenPointerEntries),
      ...this.#getPatterns(this.#skipEntries.patterns),
      ...(routes.length > 0
        ? [this.#coder.getMap(...routes), ...this.#getPatterns(this.#tokenEntries.patterns)]
        : this.#getPatterns(this.#tokenEntries.patterns))
    );
  }

  /**
   * Get the resulting parser.
   */
  get parser(): string | Core.Pattern {
    return this.#coder.getEntry(
      'Parser',
      this.#getPointers(this.#nodePointerEntries),
      ...this.#getPatterns(this.#nodeEntries.patterns)
    );
  }
}

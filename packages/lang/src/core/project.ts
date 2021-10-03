import * as Core from '@xcheme/core';

import * as Coder from './coder/base';
import * as Entries from './entries';

import { Errors } from './errors';

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
 * Project context.
 */
export class Context {
  /**
   * Project coder.
   */
  #coder: Coder.Base;

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
  #getPatterns(entries: Entries.Entry[]): Coder.Pattern[] {
    return entries.filter((entry) => entry.pattern !== void 0).map((entry) => entry.pattern!);
  }

  /**
   * Get an array of references from the specified entries.
   * @param entries References entries.
   * @returns Returns the array of references.
   */
  #getReferences(entries: Entries.Entry[]): Coder.Reference[] {
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
  constructor(coder: Coder.Base, options: Options = {}) {
    this.#coder = coder;
    this.#options = options;
  }

  /**
   * Get the project coder.
   */
  get coder(): Coder.Base {
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
    return this.#coder.getEntry('Lexer', this.#getReferences(this.#tokenEntries.references), [
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
      this.#getReferences(this.#nodeEntries.references),
      this.#getPatterns(this.#nodeEntries.patterns)
    );
  }

  /**
   * Add a new error in the project.
   * @param node Input node.
   * @param value Error value.
   */
  addError(node: Core.Node, value: Errors): void {
    this.#errors.push(new Core.Error(node.fragment, value));
  }
}

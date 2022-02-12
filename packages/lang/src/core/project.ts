import * as Core from '@xcheme/core';

import * as Coder from './coder/base';
import * as Entries from './entries';

import { Errors } from './errors';

/**
 * Map of aggregators.
 */
export type AggregatorMap = {
  [key: string]: Entries.Aggregator;
};

/**
 * Project options.
 */
export type Options = {
  /**
   * Determines the project root path.
   */
  rootPath?: string;
  /**
   * Initial identity for for directives with no explicit identities.
   */
  initialIdentity?: number;
  /**
   * Callback for loading the imported file contents.
   */
  loadFileHook?: (file: string) => string | undefined;
};

/**
 * Project context.
 */
export class Context {
  /**
   * Context depth for the same coder.
   */
  static #depth = new WeakMap();

  /**
   * Project coder.
   */
  #coder: Coder.Base;

  /**
   * Project options.
   */
  #options: Options;

  /**
   * Local entries aggregator.
   */
  #localEntries: Entries.Aggregator;

  /**
   * External entries aggregators.
   */
  #externalEntries: AggregatorMap = {};

  /**
   * Project errors.
   */
  #errors: Core.Error[] = [];

  /**
   * Get the current depth for the given coder.
   * @param coder Input coder.
   * @returns Returns the current depth.
   */
  static #count(coder: Coder.Base): number {
    return this.#depth.get(coder) ?? 0;
  }

  /**
   * Increment the current depth for the given coder.
   * @param coder Input coder.
   */
  static #increment(coder: Coder.Base): number {
    const count = this.#count(coder);
    this.#depth.set(coder, count + 1);
    return count;
  }

  /**
   * Get an array of patterns from the the specified entries.
   * @param type Entry type.
   * @param entries Input entries.
   * @returns Returns an array containing all the patterns.
   */
  #getPatterns(type: Entries.Types, entries: Entries.Entry[]): Coder.Pattern[] {
    return entries.map((entry) => {
      if (entry.dependents.includes(entry) || entry.dependents.filter((entry) => entry.type === type).length > 1) {
        return this.#coder.emitReferencePattern(entry);
      }
      return entry.pattern!;
    });
  }

  /**
   * Get an array of references from the specified entries.
   * @param entries Input entries.
   * @returns Returns an array containing all the references.
   */
  #getReferences(entries: Entries.Entry[]): Coder.Reference[] {
    return entries.map((entry) => ({ name: entry.name, pattern: entry.pattern! }));
  }

  /**
   * Get an array of entries (including all sub entries) that corresponds to the specified entry type.
   * @param type Entry type.
   * @param entries Input entries.
   * @param cache Optional cache for entries already processed.
   * @returns Returns an array containing all the corresponding entries.
   */
  #getAllEntries(type: Entries.Types, entries: Entries.Entry[], cache = new WeakSet<Entries.Entry>()): Entries.Entry[] {
    const list = [];
    for (const entry of entries) {
      if (!cache.has(entry)) {
        cache.add(entry);
        if (entry.pattern && entry.type === type) {
          list.push(entry);
        }
        list.push(...this.#getAllEntries(type, entry.dependencies, cache));
      }
    }
    return list;
  }

  /**
   * Default constructor.
   * @param name Project name.
   * @param coder Project coder.
   * @param options Project options.
   */
  constructor(name: string, coder: Coder.Base, options: Options = {}) {
    this.#coder = coder;
    this.#options = options;
    this.#localEntries = new Entries.Aggregator(`L${Context.#increment(coder)}`, name);
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
   * Get the local entries aggregator.
   */
  get local(): Entries.Aggregator {
    return this.#localEntries;
  }

  /**
   * Get the external entries aggregator.
   */
  get external(): AggregatorMap {
    return this.#externalEntries;
  }

  /**
   * Get the project errors.
   */
  get errors(): Core.Error[] {
    return this.#errors;
  }

  /**
   * Get the resulting lexer.
   */
  get lexer(): string | Core.Pattern {
    const patterns = this.#localEntries.getPatternsByType([Entries.Types.Skip, Entries.Types.Token, Entries.Types.Node]);
    const entries = this.#getAllEntries(Entries.Types.Token, patterns);
    const dependencies = entries.filter((entry) => Entries.isReferencedBy(entry, Entries.Types.Token));
    const tokens = entries.filter((entry) => !entry.alias);
    return this.#coder.getEntry('Lexer', this.#getReferences(dependencies), [
      ...this.#getPatterns(Entries.Types.Token, this.#localEntries.getPatternsByType([Entries.Types.Skip])),
      ...this.#getPatterns(Entries.Types.Token, tokens)
    ]);
  }

  /**
   * Get the resulting parser.
   */
  get parser(): string | Core.Pattern {
    const patterns = this.#localEntries.getPatternsByType([Entries.Types.Node]);
    const entries = this.#getAllEntries(Entries.Types.Node, patterns);
    const dependencies = entries.filter((entry) => Entries.isReferencedBy(entry, Entries.Types.Node));
    const nodes = entries.filter((entry) => !entry.alias);
    return this.#coder.getEntry('Parser', this.#getReferences(dependencies), this.#getPatterns(Entries.Types.Node, nodes));
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

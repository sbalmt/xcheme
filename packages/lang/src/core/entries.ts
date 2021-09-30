import * as Core from '@xcheme/core';

/**
 * Pattern entry.
 */
type Pattern = string | Core.Pattern;

/**
 * Map of entries.
 */
type Map = {
  [name: string]: Entry;
};

/**
 * Entry origins.
 */
export const enum Origins {
  User,
  Loose
}

/**
 * Map entry.
 */
export type Entry = {
  /**
   * Entry origin.
   */
  origin: Origins;
  /**
   * Entry identifier.
   */
  identifier: string;
  /**
   * Entry identity.
   */
  identity: number;
  /**
   * Determines whether or not the entry is an alias.
   */
  alias: boolean;
  /**
   * Determines whether or not the entry can have a dynamic identity.
   */
  dynamic: boolean;
  /**
   * Number of references to the entry.
   */
  references: number;
  /**
   * Entry pattern.
   */
  pattern: Pattern | undefined;
};

/**
 * Aggregate pattern entries during the making process.
 */
export class Aggregator {
  /**
   * Entry map.
   */
  #entries: Map = {};

  /**
   * Link map.
   */
  #links: Map = {};

  /**
   * Get all patterns.
   */
  get patterns(): Entry[] {
    return Object.values(this.#entries).filter((entry) => entry.references === 0 && !entry.alias);
  }

  /**
   * Get all alias patterns.
   */
  get aliasPatterns(): Entry[] {
    return Object.values(this.#entries).filter((entry) => entry.references === 0 && entry.alias);
  }

  /**
   * Get all reference patterns.
   */
  get referencePatterns(): Entry[] {
    return Object.values(this.#entries).filter((entry) => entry.references > 0);
  }

  /**
   * Determines whether or not the aggregator contains an entry with the given name.
   * @param name Entry name.
   * @returns Returns true when the specified entry exists, false otherwise.
   */
  has(name: string): boolean {
    return this.#entries[name] !== void 0 || this.#links[name] !== void 0;
  }

  /**
   * Get the entry that correspond to the given name.
   * @param name Entry name.
   * @returns Returns the corresponding entry or undefined when it doesn't exists.
   */
  get(name: string): Entry | undefined {
    return this.#entries[name] ?? this.#links[name];
  }

  /**
   * Add a new pattern entry.
   * @param origin Entry origin.
   * @param identifier Entry identifier.
   * @param identity Entry identity.
   * @throws Throws an error when the specified entry already exists.
   * @returns Returns the new entry.
   */
  add(origin: Origins, identifier: string, identity: number, model?: Partial<Entry>): Entry {
    if (this.has(identifier)) {
      throw `An entry named '${identifier}' already exists.`;
    }
    return (this.#entries[identifier] = {
      origin,
      identifier,
      identity,
      alias: model?.alias ?? false,
      dynamic: model?.dynamic ?? false,
      references: model?.references ?? 0,
      pattern: model?.pattern
    });
  }

  /**
   * Link an existing entry to another name.
   * @param name Link name.
   * @param identifier Pattern identifier.
   * @throws Throws an error when the specified name already exists or the given identifier doesn't exists.
   * @returns Returns the linked entry.
   */
  link(name: string, identifier: string): Entry {
    if (this.has(name)) {
      throw `An entry named '${name}' already exists.`;
    } else if (!this.has(identifier)) {
      throw `An entry named '${identifier}' doesn't exists.`;
    }
    return (this.#links[name] = this.get(identifier)!);
  }
}

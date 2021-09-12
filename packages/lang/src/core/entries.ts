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
 * Entry types.
 */
export const enum Types {
  Normal,
  Alias
}

/**
 * Map entry.
 */
export type Entry = {
  /**
   * Entry type.
   */
  type: Types;
  /**
   * Entry name.
   */
  name: string;
  /**
   * Entry identity.
   */
  identity: number;
  /**
   * Entry pattern.
   */
  pattern: Pattern;
};

/**
 * Aggregate pattern entries during the making process.
 */
export class Aggregator {
  /**
   * Entries map.
   */
  #map: Map = {};

  /**
   * Get all patterns.
   */
  get patterns(): Entry[] {
    return Object.values(this.#map).filter((entry) => entry.type === Types.Normal);
  }

  /**
   * Get all alias patterns.
   */
  get aliasPatterns(): Entry[] {
    return Object.values(this.#map).filter((entry) => entry.type === Types.Alias);
  }

  /**
   * Determines whether or not the aggregator contains an entry with the given name.
   * @param name Pattern entry name.
   * @returns Returns true when the specified entry exists, false otherwise.
   */
  has(name: string): boolean {
    return this.#map[name] !== void 0;
  }

  /**
   * Get the entry that correspond to the given name.
   * @param name Pattern entry name.
   * @returns Returns the corresponding entry or undefined when it doesn't exists.
   */
  get(name: string): Entry | undefined {
    return this.#map[name];
  }

  /**
   * Add a new pattern entry.
   * @param type Entry type.
   * @param name Entry name.
   * @param identity Entry identity.
   * @param pattern Entry patterns.
   * @throws Throws an error when the specified entry already exists.
   */
  add(type: Types, name: string, identity: number, pattern: Pattern): void {
    if (this.#map[name]) {
      throw `Pattern entry '${name}' already exists.`;
    }
    this.#map[name] = {
      type,
      name,
      identity,
      pattern
    };
  }
}

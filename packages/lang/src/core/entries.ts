import * as Core from '@xcheme/core';

/**
 * Pattern entry.
 */
type Pattern = string | Core.Pattern;

/**
 * Event callback.
 */
type EventCallback = (entry: Entry) => void;

/**
 * Map of aggregator events.
 */
type EventMap = {
  [identifier: string]: EventCallback[];
};

/**
 * Map of aggregator entries.
 */
type EntryMap = {
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
   * Determine whether or not an entry was created by a user directive or a loose token.
   */
  origin: Origins;
  /**
   * Unique identifier used for locating the entry.
   */
  identifier: string;
  /**
   * Unique identity number for the entry.
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
   * Determines whether or not the entry output is forced due to have dependents.
   */
  force: boolean;
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
  #entries: EntryMap = {};

  /**
   * Link map.
   */
  #links: EntryMap = {};

  /**
   * Event map.
   */
  #events: EventMap = {};

  /**
   * Get all entries.
   */
  get all(): Entry[] {
    return Object.values(this.#entries);
  }

  /**
   * Get all pattern entries.
   */
  get patterns(): Entry[] {
    return this.all.filter((entry) => !entry.alias && entry.references === 0);
  }

  /**
   * Get all reference pattern entries.
   */
  get references(): Entry[] {
    return this.all.filter((entry) => entry.references > 0);
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
      throw `Another entry named '${identifier}' can't be added.`;
    }
    const events = this.#events[identifier];
    const entry = (this.#entries[identifier] = {
      origin,
      identifier,
      identity,
      alias: model?.alias ?? false,
      dynamic: model?.dynamic ?? false,
      force: model?.force ?? false,
      references: model?.references ?? 0,
      pattern: model?.pattern
    });
    if (events !== void 0) {
      delete this.#events[identifier];
      for (const event of events) {
        event(entry);
      }
    }
    return entry;
  }

  /**
   * Link an existing entry to another name.
   * @param identifier Link identifier.
   * @param alias Alias identifier.
   * @throws Throws an error when the specified name already exists or the given identifier doesn't exists.
   * @returns Returns the linked entry.
   */
  link(identifier: string, alias: string): Entry {
    if (this.has(identifier)) {
      throw `An entry named '${identifier}' already exists.`;
    } else if (!this.has(alias)) {
      throw `An entry named '${alias}' doesn't exists.`;
    }
    return (this.#links[identifier] = this.get(alias)!);
  }

  /**
   * Add an event to be triggered once when an entry with the given identifier is added.
   * @param identifier Entry identifier.
   * @param callback Trigger callback.
   */
  on(identifier: string, callback: EventCallback): void {
    const events = this.#events[identifier];
    if (events !== void 0) {
      events.push(callback);
    } else {
      this.#events[identifier] = [callback];
    }
  }
}

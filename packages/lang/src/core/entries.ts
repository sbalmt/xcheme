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
 * Entry types.
 */
export const enum Types {
  Unknown,
  Skip,
  Token,
  Node
}

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
   * Entry name.
   */
  name: string;
  /**
   * Entry type.
   */
  type: Types;
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
   * Determines whether or not the entry can be exported.
   */
  exported: boolean;
  /**
   * Determines whether or not the entry is imported.
   */
  imported: boolean;
  /**
   * Entry dependencies.
   */
  dependencies: Entry[];
  /**
   * Entry dependents.
   */
  dependents: Entry[];
  /**
   * Entry location.
   */
  location: string;
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
   * Aggregator name.
   */
  #name: string;

  /**
   * Aggregator location.
   */
  #location: string;

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
   * Get the entry that correspond to the given name.
   * @param name Entry name.
   * @returns Returns the corresponding entry.
   * @throws Throws an exception when the given entry wasn't found.
   */
  #get(name: string): Entry {
    if (!this.has(name)) {
      throw `An entry named '${name}' doesn't exists.`;
    }
    return this.get(name)!;
  }

  /**
   * Default constructor.
   * @param name Aggregator name.
   * @param location Aggregator location.
   */
  constructor(name: string, location: string) {
    this.#name = name;
    this.#location = location;
  }

  /**
   * Get the aggregator name.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Get the aggregator location.
   */
  get location(): string {
    return this.#location;
  }

  /**
   * Get all entries.
   */
  get all(): Entry[] {
    return Object.values(this.#entries);
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
   * Get an array containing all pattern entries that corresponds to one or more specified types.
   * @param types Entry types.
   * @returns Returns an array containing all entries found.
   */
  getPatternsByType(types: Types[]): Entry[] {
    return this.all.filter((entry) => entry.pattern && !entry.alias && types.includes(entry.type));
  }

  /**
   * Add the specified pattern entry.
   * @param entry Pattern entry.
   * @throws Throws an error when the specified entry already exists.
   * @returns Returns the added entry.
   */
  add(entry: Entry): Entry {
    const { identifier } = entry;
    if (this.has(identifier)) {
      throw `Another entry named '${identifier}' can't be added.`;
    }
    const events = this.#events[identifier];
    this.#entries[identifier] = entry;
    if (events) {
      delete this.#events[identifier];
      for (const event of events) {
        event(entry);
      }
    }
    return entry;
  }

  /**
   * Create and add a new pattern entry.
   * @param type Entry type.
   * @param origin Entry origin.
   * @param identifier Entry identifier.
   * @param identity Entry identity.
   * @param model Optional entry model.
   * @throws Throws an error when the specified entry already exists.
   * @returns Returns the added entry.
   */
  create(type: Types, origin: Origins, identifier: string, identity: number, model?: Partial<Entry>): Entry {
    return this.add({
      name: `${this.#name}:${identifier}`,
      type,
      origin,
      identifier,
      identity,
      alias: model?.alias ?? false,
      dynamic: model?.dynamic ?? false,
      exported: model?.exported ?? false,
      imported: model?.imported ?? false,
      dependencies: model?.dependencies ?? [],
      dependents: model?.dependents ?? [],
      location: model?.location ?? this.#location,
      pattern: model?.pattern
    });
  }

  /**
   * Link an existing entry to another one.
   * @param identifier Link identifier.
   * @param alias Alias identifier.
   * @throws Throws an error when the specified name already exists or the given identifier doesn't exists.
   * @returns Returns the linked entry.
   */
  link(identifier: string, alias: string): Entry {
    if (this.has(identifier)) {
      throw `An entry named '${identifier}' already exists.`;
    }
    const entry = this.#get(alias);
    this.#links[identifier] = entry;
    return entry;
  }

  /**
   * Add an event to be triggered once when an entry with the given identifier is added.
   * @param identifier Entry identifier.
   * @param callback Trigger callback.
   */
  on(identifier: string, callback: EventCallback): void {
    const events = this.#events[identifier];
    if (!events) {
      this.#events[identifier] = [callback];
    } else {
      events.push(callback);
    }
  }
}

/**
 * Determines whether or not the given entry is referenced.
 * @param entry Input entry.
 * @param type Reference type.
 * @returns Returns true when the given entry is referenced, false otherwise.
 */
export const isReferencedBy = (entry: Entry, type: Types): boolean => {
  if (!entry.dependents.includes(entry)) {
    return entry.dependents.reduce((previous, current) => (current.type === type ? previous + 1 : previous), 0) > 1;
  }
  return true;
};

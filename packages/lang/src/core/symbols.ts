import * as Types from './types';

import { Exception } from './exception';

/**
 * Event callback.
 */
export type EventCallback = (record: Types.Record) => void;

/**
 * Map of events.
 */
type EventMap = {
  [identifier: string]: EventCallback[];
};

/**
 * Map of records.
 */
type RecordMap = {
  [identifier: string]: Types.Record;
};

/**
 * Symbol aggregator class.
 */
export class Aggregator implements Iterable<Types.Record> {
  /**
   * Symbol records.
   */
  #records: RecordMap = {};

  /**
   * Symbol links.
   */
  #links: RecordMap = {};

  /**
   * Symbols events.
   */
  #events: EventMap = {};

  /**
   * Get the record that correspond to the given identifier.
   * @param identifier Record identifier.
   * @returns Returns the corresponding record.
   * @throws Throws an exception when the given record wasn't found.
   */
  #get(identifier: string): Types.Record {
    if (!this.has(identifier)) {
      throw new Exception(`A record named '${identifier}' doesn't exists.`);
    }
    return this.get(identifier)!;
  }

  /**
   * Determines whether or not a record with the given identifier exists.
   * @param identifier Record identifier.
   * @returns Returns true when the record exists, false otherwise.
   */
  has(identifier: string): boolean {
    return this.#records[identifier] !== void 0 || this.#links[identifier] !== void 0;
  }

  /**
   * Get the record that correspond to the given identifier.
   * @param identifier Record identifier.
   * @returns Returns the corresponding record or undefined when it doesn't exists.
   */
  get(identifier: string): Types.Record | undefined {
    return this.#records[identifier] ?? this.#links[identifier];
  }

  /**
   * Add the specified record,.
   * @param record Symbol record.
   * @throws Throws an error when the specified record already exists.
   * @returns Returns the added record.
   */
  add(record: Types.Record): Types.Record {
    const { identifier } = record.data;
    if (!identifier || this.has(identifier)) {
      throw new Exception(`A record named '${identifier}' can't be added.`);
    }
    const events = this.#events[identifier];
    this.#records[identifier] = record;
    if (events) {
      delete this.#events[identifier];
      for (const event of events) {
        event(record);
      }
    }
    return record;
  }

  /**
   * Link an existing record to another one.
   * @param identifier Record identifier.
   * @param alias Alias identifier.
   * @throws Throws an error when the specified alias already exists or the given identifier doesn't exists.
   * @returns Returns the linked record.
   */
  link(identifier: string, alias: string): Types.Record {
    if (this.has(identifier)) {
      throw new Exception(`An entry named '${identifier}' already exists.`);
    }
    const entry = this.#get(alias);
    this.#links[identifier] = entry;
    return entry;
  }

  /**
   * Add an event to be triggered once a record with the given identifier is added.
   * @param identifier Record identifier.
   * @param callback Trigger callback.
   */
  listen(identifier: string, callback: EventCallback): void {
    const events = this.#events[identifier];
    if (!events) {
      this.#events[identifier] = [callback];
    } else {
      events.push(callback);
    }
  }

  /**
   * Iterable generator.
   */
  *[Symbol.iterator](): Iterator<Types.Record> {
    for (const name in this.#records) {
      yield this.#records[name];
    }
  }
}

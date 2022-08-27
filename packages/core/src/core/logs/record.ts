import type { Fragment } from '../coordinates';

import { LogType } from './type';

/**
 * A log record for the log list generated in the analysis process.
 */
export class LogRecord {
  /**
   * Record type.
   */
  #type: LogType;

  /**
   * Record fragment.
   */
  #fragment: Fragment;

  /**
   * Record value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param type Record type.
   * @param fragment Record fragment.
   * @param value Record value.
   */
  constructor(type: LogType, fragment: Fragment, value: number) {
    this.#type = type;
    this.#fragment = fragment;
    this.#value = value;
  }

  /**
   * Get the record type.
   */
  get type(): LogType {
    return this.#type;
  }

  /**
   * Get the record fragment.
   */
  get fragment(): Fragment {
    return this.#fragment;
  }

  /**
   * Get the record value.
   */
  get value(): number {
    return this.#value;
  }

  /**
   * Swap all contents of the given record.
   * @param record Log record.
   */
  swap(record: LogRecord): void {
    [this.#type, record.#type] = [record.#type, this.#type];
    [this.#fragment, record.#fragment] = [record.#fragment, this.#fragment];
    [this.#value, record.#value] = [record.#value, this.#value];
  }
}

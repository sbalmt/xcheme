import type { Fragment } from '../coordinates';

import { List, ReadOnlyList } from '../collections';
import { LogRecord } from './record';
import { LogType } from './type';

/**
 * Log list class.
 */
export class LogList extends List<LogRecord> {
  /**
   * Construct and add a new log record for the given fragment, value and type.
   * @param type Record type.
   * @param fragment Record fragment.
   * @param value Record value.
   * @returns Returns the new record.
   */
  emplace(type: LogType, fragment: Fragment, value: number): LogRecord {
    const record = new LogRecord(type, fragment, value);
    this.insert(record);
    return record;
  }
}

/**
 * Read-only log list class.
 */
export class ReadOnlyLogList extends ReadOnlyList<LogRecord> {}

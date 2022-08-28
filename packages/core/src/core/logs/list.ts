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
   * @param type Log type.
   * @param fragment Record fragment.
   * @param value Record value.
   * @returns Returns the new record.
   */
  emplace(type: LogType, fragment: Fragment, value: number): LogRecord {
    const record = new LogRecord(type, fragment, value);
    this.insert(record);
    return record;
  }

  /**
   * Count the total amount of logs for the specified log type.
   * @param type Log type.
   * @returns Returns the total amount of logs for the given log type.
   */
  count(type: LogType): number {
    let total = 0;
    for (const log of this) {
      if (log.type === type) {
        total++;
      }
    }
    return total;
  }
}

/**
 * Read-only log list class.
 */
export class ReadOnlyLogList extends ReadOnlyList<LogRecord> {}

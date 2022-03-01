import * as Core from '@xcheme/core';

/**
 * Get the formatted fragment message.
 * @param fragment Input fragment.
 * @returns Returns the fragment message.
 */
export const getMessage = (fragment: Core.Fragment): string => {
  return fragment.data.replace(/\n/g, '\\n');
};

/**
 * Get the formatted fragment location.
 * @param fragment Input fragment.
 * @returns Returns the fragment location.
 */
export const getLocation = (fragment: Core.Fragment): string => {
  const location = fragment.location;
  const line = location.line.begin.toString();
  const column = location.column.begin.toString();
  return `${line.padStart(4, ' ')}:${column.padEnd(4, ' ')}`;
};

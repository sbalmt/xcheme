import * as Helpers from './helpers';

/**
 * Clear the current line.
 */
export const clearLine = (): void => {
  Helpers.clear(process.stderr);
};

/**
 * Write the specified message into stderr.
 * @param message Message text.
 */
export const writeLine = (message: string): void => {
  process.stderr.write(message);
};

/**
 * Print the specified message into stderr.
 * @param message Message text.
 */
export const printLine = (message: string): void => {
  process.stderr.write(`${message}\n`);
};

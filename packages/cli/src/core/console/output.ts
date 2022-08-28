import * as Helpers from './helpers';

/**
 * Clear the current line.
 */
export const clearLine = (): void => {
  Helpers.clear(process.stdout);
};

/**
 * Write the specified message into stdout.
 * @param message Message text.
 */
export const writeLine = (message: string): void => {
  process.stdout.write(message);
};

/**
 * Print the specified message into stdout.
 * @param message Message text.
 */
export const printLine = (message: string): void => {
  process.stdout.write(`${message}\n`);
};

/**
 * Clear the current line.
 */
export const clearLine = (): void => {
  if (process.stdout.isTTY) {
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine(1);
  }
};

/**
 * Write the specified message into stdout.
 * @param message Input message.
 */
export const writeLine = (message: string): void => {
  process.stdout.write(message);
};

/**
 * Print the specified message into stdout.
 * @param message Input message.
 */
export const printLine = (message: string): void => {
  process.stdout.write(`${message}\n`);
};

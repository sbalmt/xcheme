/**
 * Clear the current line on the given stream.
 * @param target Target stream.
 */
export const clear = (target: NodeJS.WriteStream): void => {
  if (target.isTTY) {
    target.moveCursor(0, -1);
    target.clearLine(1);
  }
};

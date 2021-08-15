"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printLine = exports.writeLine = exports.clearLine = void 0;
/**
 * Clear the current line.
 */
const clearLine = () => {
    if (process.stdout.isTTY) {
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine(1);
    }
};
exports.clearLine = clearLine;
/**
 * Write the specified message into stdout.
 * @param message Input message.
 */
const writeLine = (message) => {
    process.stdout.write(message);
};
exports.writeLine = writeLine;
/**
 * Print the specified message into stdout.
 * @param message Input message.
 */
const printLine = (message) => {
    process.stdout.write(`${message}\n`);
};
exports.printLine = printLine;
//# sourceMappingURL=console.js.map
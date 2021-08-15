"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;
const Console = require("./console");
const Fragment = require("./fragment");
/**
 * Get the formatted token code.
 * @param token Input token.
 * @returns Returns the formatted token code.
 */
const getCode = (token) => {
    return `${token.value.toString().padStart(4, '0')}`;
};
/**
 * Print a list for the given tokens.
 * @param tokens Input tokens.
 */
const print = (tokens) => {
    Console.printLine('Tokens:');
    for (const token of tokens) {
        const location = Fragment.getLocation(token.fragment);
        const message = Fragment.getMessage(token.fragment);
        Console.printLine(` ${location} ${getCode(token)} "${message}"`);
    }
    Console.printLine('');
};
exports.print = print;
//# sourceMappingURL=tokens.js.map
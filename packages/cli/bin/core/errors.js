"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = exports.getMessage = void 0;
const Lang = require("@xcheme/lang");
const Console = require("./console");
/**
 * All supported errors.
 */
const errorMessages = {
    [4096 /* DUPLICATE_IDENTIFIER */]: "Duplicate identifier '{0}' at line {1}, column {2}.",
    [4097 /* UNEXPECTED_TOKEN */]: "Unexpected token '{0}' at line {1}, column {2}.",
    [4098 /* UNEXPECTED_SYNTAX */]: "Unexpected syntax '{0}' at line {1}, column {2}.",
    [4099 /* UNEXPECTED_NODE */]: "Unexpected node '{0}' at line {1}, column {2}.",
    [4100 /* INVALID_NODE_REFERENCE */]: "Node reference cannot be in use here, '{0}' at line {1}, column {2}.",
    [4101 /* INVALID_TOKEN_REFERENCE */]: "Token reference cannot be in use here, '{0}' at line {1}, column {2}.",
    [4102 /* INVALID_ALIAS_TOKEN_REFERENCE */]: "Alias Token reference cannot be in use here, '{0}' at line {1}, column {2}.",
    [4103 /* UNRESOLVED_TOKEN_REFERENCE */]: "Token reference is not resolved yet, '{0}' at line {1}, column {2}.",
    [4104 /* UNDEFINED_IDENTIFIER */]: "Undefined identifiers cannot be referenced, '{0}' at line {1}, column {2}."
};
/**
 * Get the corresponding error message based on the given error object.
 * @param error Input error.
 * @returns Returns the corresponding error message.
 * @throws Throws an error when the specified error isn't supported.
 */
const getMessage = (error) => {
    const template = errorMessages[error.value];
    if (!template) {
        throw `Error value ${error.value} is not supported.`;
    }
    const fragment = error.fragment;
    const location = fragment.location;
    return template.replace(/(\{[0-2]\})/g, (match) => {
        switch (match) {
            case '{0}':
                return fragment.data.replace(/\n/g, '\\n');
            case '{1}':
                return (location.line + 1).toString();
            case '{2}':
                return (location.column + 1).toString();
        }
        return match;
    });
};
exports.getMessage = getMessage;
/**
 * Print all the given errors.
 * @param errors Error list.
 */
const print = (errors) => {
    Console.printLine('Errors:');
    for (const error of errors) {
        Console.printLine(`  ${exports.getMessage(error)}`);
    }
    Console.printLine('');
};
exports.print = print;
//# sourceMappingURL=errors.js.map
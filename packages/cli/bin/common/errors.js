"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = exports.getMessage = void 0;
/**
 * All supported errors.
 */
const errorMessages = {
    [4096 /* DUPLICATE_IDENTIFIER */]: "Duplicate identifier '{0}' at line {1}, column {2}.",
    [4097 /* UNEXPECTED_TOKEN */]: "Unexpected token '{0}' at line {1}, column {2}.",
    [4098 /* UNEXPECTED_SYNTAX */]: "Unexpected syntax '{0}' at line {1}, column {2}.",
    [4099 /* UNEXPECTED_NODE */]: "Unexpected node '{0}' at line {1}, column {2}.",
    [4100 /* INVALID_NODE_REFERENCE */]: "Invalid node reference '{0}' at line {1}, column {2}.",
    [4101 /* INVALID_TOKEN_REFERENCE */]: "Invalid token reference '{0}' at line {1}, column {2}.",
    [4102 /* UNRESOLVED_TOKEN_REFERENCE */]: "Unresolved token reference '{0}' at line {1}, column {2}.",
    [4103 /* UNDEFINED_IDENTIFIER */]: "Undefined identifier '{0}' at line {1}, column {2}."
};
/**
 * Get a formatted error message for the given error.
 * @param error Input error.
 * @returns Returns the formatted error message.
 */
const getMessage = (error) => {
    const template = errorMessages[error.value];
    if (!template) {
        throw `Unsupported error value ${error.value}.`;
    }
    const fragment = error.fragment;
    const location = fragment.location;
    return template.replace(/\{([1-2])\}/g, (match) => {
        switch (match) {
            case '0':
                return fragment.data.replace(/\n/g, '\\n');
            case '1':
                return location.line.toString();
            case '2':
                return location.column.toString();
        }
        return match;
    });
};
exports.getMessage = getMessage;
/**
 * Print all the errors in the given list.
 * @param errors Error list.
 */
const print = (errors) => {
    console.group('Errors');
    for (const error of errors) {
        console.log(exports.getMessage(error));
    }
    console.groupEnd();
};
exports.print = print;
//# sourceMappingURL=errors.js.map
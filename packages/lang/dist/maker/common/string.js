"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = exports.extract = void 0;
/**
 * Characters that can have slashes.
 */
const charList = ['\\\\', '\\t', '\\v', '\\f', '\\r', '\\n', "\\'"];
/**
 * Regex for adding slashes.
 */
const addRegex = new RegExp(`(?:${charList.join('|')})`, 'g');
/**
 * Regex for stripping slashes.
 */
const stripRegex = new RegExp(`(?:${charList.join('|').replaceAll('\\', '\\\\')})`, 'g');
/**
 * Strip slashes in the given input text.
 * @param text Input text.
 * @returns Returns the stripped text.
 */
const stripSlashes = (text) => {
    return text.replace(stripRegex, (match) => {
        switch (match) {
            case '\\\\':
                return '\\';
            case '\\t':
                return '\t';
            case '\\v':
                return '\v';
            case '\\f':
                return '\f';
            case '\\r':
                return '\r';
            case '\\n':
                return '\n';
            case "\\'":
                return "'";
        }
        return match;
    });
};
/**
 * Add slashes in the given input text.
 * @param text Input text.
 * @returns Returns the slashed text.
 */
const addSlashes = (text) => {
    return text.replace(addRegex, (match) => {
        switch (match) {
            case '\\':
                return '\\\\';
            case '\t':
                return '\\t';
            case '\v':
                return '\\v';
            case '\f':
                return '\\f';
            case '\r':
                return '\\r';
            case '\n':
                return '\\n';
            case "'":
                return "\\'";
        }
        return match;
    });
};
/**
 * Extract the text from the given string removing all slashes.
 * @param text Input text.
 * @returns Returns the extracted text.
 */
const extract = (text) => {
    return stripSlashes(text.substring(1, text.length - 1));
};
exports.extract = extract;
/**
 * Compose a string with the given text adding all necessary slashes.
 * @param text Input text.
 * @returns Returns the composed string.
 */
const compose = (value) => {
    return `'${addSlashes(value)}'`;
};
exports.compose = compose;
//# sourceMappingURL=string.js.map
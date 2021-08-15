"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocation = exports.getMessage = void 0;
/**
 * Get the formatted fragment message.
 * @param fragment Input fragment.
 * @returns Returns the fragment message.
 */
const getMessage = (fragment) => {
    return fragment.data.replace(/\n/g, '\\n');
};
exports.getMessage = getMessage;
/**
 * Get the formatted fragment location.
 * @param fragment Input fragment.
 * @returns Returns the fragment location.
 */
const getLocation = (fragment) => {
    const location = fragment.location;
    const line = location.line.toString();
    const column = location.column.toString();
    return `${line.padStart(4, ' ')}:${column.padEnd(4, ' ')}`;
};
exports.getLocation = getLocation;
//# sourceMappingURL=fragment.js.map
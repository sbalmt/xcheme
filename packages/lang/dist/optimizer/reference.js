"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewEntry = void 0;
/**
 * Get a new entry with the given identity.
 * @param identity Entry identity.
 * @returns Returns the new entry.
 */
const getNewEntry = (identity) => {
    return {
        type: 0 /* Undefined */,
        identifier: '?',
        identity: identity,
        dynamic: false
    };
};
exports.getNewEntry = getNewEntry;
//# sourceMappingURL=reference.js.map
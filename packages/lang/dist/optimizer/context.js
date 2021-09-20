"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewState = void 0;
const Reference = require("./reference");
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param references References map.
 * @param counter Auto identity counter.
 * @returns Returns the new state.
 */
const getNewState = (anchor, references, counter) => {
    return {
        type: 0 /* Undefined */,
        anchor: anchor,
        alias: false,
        entry: Reference.getNewEntry(counter),
        references,
        counter
    };
};
exports.getNewState = getNewState;
//# sourceMappingURL=context.js.map
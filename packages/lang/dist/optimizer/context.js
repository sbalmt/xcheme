"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewState = void 0;
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param counter Auto identity counter.
 * @returns Returns the new state.
 */
const getNewState = (anchor, counter) => {
    return {
        type: 0 /* Undefined */,
        anchor: anchor,
        counter,
        entry: {
            type: 0 /* Undefined */,
            origin: 0 /* Undefined */,
            identifier: '?',
            identity: counter,
            dynamic: false,
            references: 0,
            pattern: undefined
        }
    };
};
exports.getNewState = getNewState;
//# sourceMappingURL=context.js.map
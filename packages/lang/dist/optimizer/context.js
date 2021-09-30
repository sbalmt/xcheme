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
            origin: 0 /* User */,
            identifier: '?',
            identity: counter,
            alias: false,
            dynamic: false
        }
    };
};
exports.getNewState = getNewState;
//# sourceMappingURL=context.js.map
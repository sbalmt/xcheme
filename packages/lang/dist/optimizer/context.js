"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCount = exports.getNewState = void 0;
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity Entry identity.
 * @returns Returns the new state.
 */
const getNewState = (anchor, identity) => {
    return {
        anchor,
        entry: {
            type: 0 /* Unknown */,
            origin: 0 /* User */,
            identifier: '?',
            identity,
            alias: false,
            dynamic: false,
            exported: false,
            dependencies: []
        }
    };
};
exports.getNewState = getNewState;
const counters = new WeakMap();
const getCount = (project) => {
    const counter = counters.get(project.coder) ?? project.options.initialIdentity ?? 0;
    counters.set(project.coder, counter + 1);
    return counter;
};
exports.getCount = getCount;
//# sourceMappingURL=context.js.map
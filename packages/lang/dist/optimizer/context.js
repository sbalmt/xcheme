"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCount = exports.getNewState = exports.getNewStateEntry = void 0;
/**
 * Get a new state entry based on the given entry model.
 * @param model Entry model.
 * @returns Returns the generated entry.
 */
const getNewStateEntry = (model) => {
    return {
        type: model.type ?? 0 /* Unknown */,
        origin: model.origin ?? 0 /* User */,
        identifier: model.identifier ?? '?',
        identity: model.identity ?? -1,
        alias: model.alias ?? false,
        dynamic: model.dynamic ?? false,
        exported: model.exported ?? false
    };
};
exports.getNewStateEntry = getNewStateEntry;
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity Entry identity.
 * @returns Returns the new state.
 */
const getNewState = (anchor, identity) => {
    return {
        anchor,
        entry: (0, exports.getNewStateEntry)({
            origin: 0 /* User */,
            identity
        })
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
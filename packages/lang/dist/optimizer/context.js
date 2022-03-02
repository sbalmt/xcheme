"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMetadata = exports.getNewState = void 0;
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity State identity.
 * @returns Returns the new state.
 */
const getNewState = (anchor, identity) => {
    return {
        type: 0 /* Unknown */,
        origin: 0 /* User */,
        identity,
        anchor
    };
};
exports.getNewState = getNewState;
/**
 * Set the record's metadata based on the given identifier and consumption state.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param record Target record.
 * @param state Consumption state.
 */
const setMetadata = (project, identifier, record, state) => {
    Object.assign(record.data, {
        type: state.type,
        origin: state.origin,
        name: `L${project.id}:${identifier}`,
        identifier,
        identity: state.identity,
        location: project.name,
        dynamic: false,
        imported: false,
        exported: false,
        dependencies: [],
        dependents: [],
        pattern: void 0
    });
};
exports.setMetadata = setMetadata;
//# sourceMappingURL=context.js.map
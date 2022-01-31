"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReference = exports.getToken = exports.getIdentifier = exports.getIdentity = void 0;
const Core = require("@xcheme/core");
const Parser = require("../parser");
/**
 * Get a new identity node.
 * @param identity Node identity.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
const getIdentity = (identity, table, location) => {
    const fragment = new Core.Fragment(identity, 0, identity.length, location);
    const node = new Core.Node(fragment, 202 /* Identity */, table);
    return node;
};
exports.getIdentity = getIdentity;
/**
 * Get a new identifier node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
const getIdentifier = (identifier, table, location) => {
    const identity = identifier.substring(4);
    const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
    const node = new Core.Node(fragment, 200 /* Identifier */, table);
    const record = new Core.Record(fragment, 300 /* Token */, node);
    node.setChild(0 /* Left */, (0, exports.getIdentity)(identity, table, location));
    table.add(record);
    return node;
};
exports.getIdentifier = getIdentifier;
/**
 * Get a new token node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @param expression Node expression.
 * @returns Return the node.
 */
const getToken = (identifier, table, location, expression) => {
    const fragment = new Core.Fragment('token', 0, 5, location);
    const node = new Core.Node(fragment, 236 /* Token */, table);
    const ident = (0, exports.getIdentifier)(identifier, table, location);
    ident.setChild(1 /* Right */, expression);
    node.setChild(1 /* Right */, ident);
    return node;
};
exports.getToken = getToken;
/**
 * Get a new reference node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the reference node.
 */
const getReference = (identifier, table, location) => {
    const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
    const node = new Core.Node(fragment, 201 /* Reference */, table);
    return node;
};
exports.getReference = getReference;
//# sourceMappingURL=nodes.js.map
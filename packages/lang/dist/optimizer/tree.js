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
    const ident = new Core.Node(fragment, table, 202 /* Identity */);
    return ident;
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
    const identity = identifier.substr(4);
    const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
    const ident = new Core.Node(fragment, table, 200 /* Identifier */);
    const record = new Core.Record(fragment, ident, 300 /* Token */);
    ident.setChild(0 /* Left */, exports.getIdentity(identity, table, location));
    table.add(record);
    return ident;
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
    const token = new Core.Node(fragment, table, 232 /* Token */);
    const ident = exports.getIdentifier(identifier, table, location);
    ident.setChild(1 /* Right */, expression);
    token.setChild(1 /* Right */, ident);
    return token;
};
exports.getToken = getToken;
/**
 * Get a new reference node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
const getReference = (identifier, table, location) => {
    const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
    const reference = new Core.Node(fragment, table, 201 /* Reference */);
    return reference;
};
exports.getReference = getReference;
//# sourceMappingURL=tree.js.map
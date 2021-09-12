import * as Core from '@xcheme/core';
/**
 * Get a new identity node.
 * @param identity Node identity.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
export declare const getIdentity: (identity: string, table: Core.Table, location: Core.Location) => Core.Node;
/**
 * Get a new identifier node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
export declare const getIdentifier: (identifier: string, table: Core.Table, location: Core.Location) => Core.Node;
/**
 * Get a new token node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @param expression Node expression.
 * @returns Return the node.
 */
export declare const getToken: (identifier: string, table: Core.Table, location: Core.Location, expression: Core.Node) => Core.Node;
/**
 * Get a new reference node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
export declare const getReference: (identifier: string, table: Core.Table, location: Core.Location) => Core.Node;

import * as Core from '@xcheme/core';
import * as Project from '../core/project';
import * as Symbols from '../core/symbols';
/**
 * Context consumption state.
 */
export declare type State = {
    /**
     * State type.
     */
    type: Symbols.Types;
    /**
     * State origin.
     */
    origin: Symbols.Origins;
    /**
     * State identity.
     */
    identity: number;
    /**
     * Anchor AST node.
     */
    anchor: Core.Node;
    /**
     * State record.
     */
    record?: Core.Record;
};
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity State identity.
 * @returns Returns the new state.
 */
export declare const getNewState: (anchor: Core.Node, identity: number) => State;
/**
 * Set the record's metadata based on the given identifier and consumption state.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param record Target record.
 * @param state Consumption state.
 */
export declare const setMetadata: (project: Project.Context, identifier: string, record: Core.Record, state: State) => void;

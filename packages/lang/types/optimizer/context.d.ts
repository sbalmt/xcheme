import type * as Reference from './reference';
import * as Core from '@xcheme/core';
/**
 * Context types.
 */
export declare const enum Types {
    Undefined = 0,
    Skip = 1,
    Token = 2,
    Node = 3
}
/**
 * Store the consumption state for the context.
 */
export declare type State = {
    /**
     * Context type.
     */
    type: Types;
    /**
     * Previous entry node.
     */
    entry: Core.Node;
    /**
     * Current identity.
     */
    identity: number;
    /**
     * All references.
     */
    references: Reference.Map;
};

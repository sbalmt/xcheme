import * as Core from '@xcheme/core';
import * as Coder from './coder/base';
import * as Entries from './entries';
import { Errors } from './errors';
/**
 * Project options.
 */
export declare type Options = {
    /**
     * Initial identity number for tokens, nodes and symbols.
     */
    initialIdentity?: number;
};
/**
 * Project context.
 */
export declare class Context {
    #private;
    /**
     * Default constructor.
     * @param coder Project coder.
     * @param options Project options.
     */
    constructor(coder: Coder.Base, options?: Options);
    /**
     * Get the project coder.
     */
    get coder(): Coder.Base;
    /**
     * Get the project options.
     */
    get options(): Options;
    /**
     * Get the project errors.
     */
    get errors(): Core.Error[];
    /**
     * Get the skip entries aggregator.
     */
    get skipEntries(): Entries.Aggregator;
    /**
     * Get the token entries aggregator.
     */
    get tokenEntries(): Entries.Aggregator;
    /**
     * Get the node entries aggregator.
     */
    get nodeEntries(): Entries.Aggregator;
    /**
     * Get the resulting lexer.
     */
    get lexer(): string | Core.Pattern;
    /**
     * Get the resulting parser.
     */
    get parser(): string | Core.Pattern;
    /**
     * Add a new error in the project.
     * @param node Input node.
     * @param value Error value.
     */
    addError(node: Core.Node, value: Errors): void;
}

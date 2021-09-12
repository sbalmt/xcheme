import * as Core from '@xcheme/core';
import * as Entries from './entries';
import { Base } from '../maker/coder/base';
/**
 * Project options.
 */
export declare type Options = {
    /**
     * Initial identity for tokens, nodes and symbols.
     */
    initialIdentity?: number;
};
/**
 * Store all the project entries, errors and options during the making process.
 */
export declare class Project {
    #private;
    /**
     * Default constructor.
     * @param coder Project coder.
     * @param options Project options.
     */
    constructor(coder: Base, options?: Options);
    /**
     * Get the project coder.
     */
    get coder(): Base;
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
     * Get the token pointer entries aggregator.
     */
    get tokenPointerEntries(): Entries.Aggregator;
    /**
     * Get the node entries aggregator.
     */
    get nodeEntries(): Entries.Aggregator;
    /**
     * Get the node pointer entries aggregator.
     */
    get nodePointerEntries(): Entries.Aggregator;
    /**
     * Get the resulting lexer.
     */
    get lexer(): string | Core.Pattern;
    /**
     * Get the resulting parser.
     */
    get parser(): string | Core.Pattern;
}

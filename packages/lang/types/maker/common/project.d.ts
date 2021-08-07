import * as Core from '@xcheme/core';
import * as Entries from './entries';
import { Counters } from './context';
import { Base } from '../coder/base';
/**
 * Project options.
 */
export declare type Options = {
    /**
     * Initial counters.
     */
    counters?: Counters;
};
/**
 * Store the project entries, errors and options during the making process.
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
     * Get the skip entries.
     */
    get skipEntries(): Entries.Aggregator;
    /**
     * Get the token entries.
     */
    get tokenEntries(): Entries.Aggregator;
    /**
     * Get the token pointer entries.
     */
    get tokenPointerEntries(): Entries.Aggregator;
    /**
     * Get the node entries.
     */
    get nodeEntries(): Entries.Aggregator;
    /**
     * Get the node pointer entries.
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

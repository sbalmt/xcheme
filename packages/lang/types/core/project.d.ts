import * as Core from '@xcheme/core';
import * as Coder from './coder/base';
import * as Entries from './entries';
import { Errors } from './errors';
/**
 * Map of aggregators.
 */
export declare type AggregatorMap = {
    [key: string]: Entries.Aggregator;
};
/**
 * Project options.
 */
export declare type Options = {
    /**
     * Determines the project root path.
     */
    rootPath?: string;
    /**
     * Initial identity for for directives with no explicit identities.
     */
    initialIdentity?: number;
    /**
     * Callback for loading the imported file contents.
     */
    loadFileHook?: (file: string) => string | undefined;
};
/**
 * Project context.
 */
export declare class Context {
    #private;
    /**
     * Default constructor.
     * @param name Project name.
     * @param coder Project coder.
     * @param options Project options.
     */
    constructor(name: string, coder: Coder.Base, options?: Options);
    /**
     * Get the project coder.
     */
    get coder(): Coder.Base;
    /**
     * Get the project options.
     */
    get options(): Options;
    /**
     * Get the local entries aggregator.
     */
    get local(): Entries.Aggregator;
    /**
     * Get the external entries aggregator.
     */
    get external(): AggregatorMap;
    /**
     * Get the project errors.
     */
    get errors(): Core.Error[];
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

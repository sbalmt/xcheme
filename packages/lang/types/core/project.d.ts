import * as Core from '@xcheme/core';
import * as Coder from './coder/base';
import * as Counter from './counter';
import * as Symbols from './symbols';
import { Errors } from './errors';
/**
 * Project options.
 */
export declare type Options = {
    /**
     * Initial number for implicit identities.
     */
    identity?: number;
    /**
     * Determines the project's root directory.
     */
    directory?: string;
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
     * Get the global identity counter.
     */
    static get identity(): Counter.Context;
    /**
     * Get the project Id.
     */
    get id(): number;
    /**
     * Get the project name.
     */
    get name(): string;
    /**
     * Get the project coder.
     */
    get coder(): Coder.Base;
    /**
     * Get the project options.
     */
    get options(): Options;
    /**
     * Get the project symbols.
     */
    get symbols(): Symbols.Aggregator;
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
     * @param fragment Error fragment.
     * @param value Error value.
     */
    addError(fragment: Core.Fragment, value: Errors): void;
}

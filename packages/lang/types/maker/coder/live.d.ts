import * as Core from '@xcheme/core';
import * as Entries from '../common/entries';
import { Base } from './base';
/**
 * Pointer entry type.
 */
declare type PointerEntry = {
    /**
     * Pointer entry name.
     */
    name: string;
    /**
     * Pointer entry pattern.
     */
    pattern: Core.Pattern;
};
/**
 * Generate a project output for running in memory.
 */
export declare class Live extends Base {
    /**
     * Get a new entry pattern.
     * @param name Entry name.
     * @param pointers Entry pointers.
     * @param patterns Entry patterns.
     * @returns Returns the pattern.
     */
    getEntry(name: string, pointers: PointerEntry[], ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new route.
     * @param value Route value.
     * @param path Route path.
     * @returns Returns the route.
     */
    getRoute(value: number, path: string[]): Core.Route;
    /**
     * Get a new skip pattern.
     * @param routes Skip routes.
     * @returns Returns the pattern.
     */
    getSkip(...routes: Core.Route[]): Core.Pattern;
    /**
     * Get a new token pattern.
     * @param value Token value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getToken(value: string | number, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new node pattern.
     * @param value Node value.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNode(value: string | number, output: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    getCondition(test: Core.Pattern, success: Core.Pattern, failure?: Core.Pattern): Core.Pattern;
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    getChoose(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new choose alphabet pattern.
     * @param alphabet Possible alphabet.
     * @returns Returns the pattern.
     */
    getChooseAlphabet(alphabet: (string | number)[]): Core.Pattern;
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getExpect(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new expect alphabet pattern.
     * @param alphabet Expected alphabet.
     * @returns Returns the pattern.
     */
    getExpectAlphabet(alphabet: (string | number)[]): Core.Pattern;
    /**
     * Get a new negate pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNegate(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * get a new option pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getOption(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getRepeat(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new scope node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getScopeNode(current: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new pivot node pattern.
     * @param value Node value.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPivotNode(value: string | number, pivot: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new append node pattern.
     * @param value Node value.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getAppendNode(value: string | number, current: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new prepend node pattern.
     * @param value Node value.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPrependNode(value: string | number, current: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new symbol pattern.
     * @param value Symbol value.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSymbol(value: string | number, symbol: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new scope symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getScopeSymbol(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Returns the pattern.
     */
    getReference(entries: Entries.Aggregator, name: string): Core.Pattern;
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    getAny(): Core.Pattern;
    /**
     * Get a new range pattern.
     * @param from From alphabet value.
     * @param to To alphabet value.
     * @returns Returns the pattern.
     */
    getRange(from: string | number, to: string | number): Core.Pattern;
    /**
     * Get a new alphabet pattern.
     * @param alphabet Input alphabet.
     * @returns Returns the alphabet pattern.
     */
    getAlphabet(alphabet: (string | number)[]): Core.Pattern;
}
export {};

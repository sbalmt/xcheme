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
    pattern: string;
};
/**
 * Can generate a project output to be saved as a JavaScript source.
 */
export declare class Text extends Base {
    #private;
    /**
     * Get a new entry pattern.
     * @param name Entry name.
     * @param pointers Entry pointers.
     * @param patterns Entry patterns.
     * @returns Returns the pattern.
     */
    getEntry(name: string, pointers: PointerEntry[], ...patterns: string[]): string;
    /**
     * Get a new route.
     * @param value Route value.
     * @param path Route path.
     * @returns Returns the route.
     */
    getRoute(value: number, path: string[]): string;
    /**
     * Get a new skip pattern.
     * @param routes Skip routes.
     * @returns Returns the pattern.
     */
    getSkip(...patterns: string[]): string;
    /**
     * Get a new token pattern.
     * @param value Token value.
     * @param patterns Token patterns.
     * @returns Returns the pattern.
     */
    getToken(value: string | number, ...patterns: string[]): string;
    /**
     * Get a new node pattern.
     * @param value Node value.
     * @param output Output node direction.
     * @param patterns Node patterns.
     * @returns Returns the pattern.
     */
    getNode(value: string | number, output: Core.Nodes, ...patterns: string[]): string;
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    getCondition(test: string, success: string, failure?: string): string;
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    getChoose(...patterns: string[]): string;
    /**
     * Should be implemented to return a choose alphabet pattern.
     * @param alphabet Possible alphabet.
     * @returns Should return the pattern.
     */
    getChooseAlphabet(alphabet: (string | number)[]): string;
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getExpect(...patterns: string[]): string;
    /**
     * Get a new expect alphabet pattern.
     * @param alphabet Expected alphabet.
     * @returns Returns the pattern.
     */
    getExpectAlphabet(alphabet: (string | number)[]): string;
    /**
     * Get a new negate pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNegate(...patterns: string[]): string;
    /**
     * get a new option pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getOption(...patterns: string[]): string;
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getRepeat(...patterns: string[]): string;
    /**
     * Get a new pivot node pattern.
     * @param value Node value.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPivotNode(value: string | number, pivot: string, ...patterns: string[]): string;
    /**
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPlaceNode(current: Core.Nodes, ...patterns: string[]): string;
    /**
     * Get a new append node pattern.
     * @param value Node value.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getAppendNode(value: string | number, current: Core.Nodes, head: string, ...patterns: string[]): string;
    /**
     * Get a new prepend node pattern.
     * @param value Node value.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getPrependNode(value: string | number, current: Core.Nodes, head: string, ...patterns: string[]): string;
    /**
     * Get a new symbol pattern.
     * @param value Symbol value.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSymbol(value: string | number, symbol: string, ...patterns: string[]): string;
    /**
     * Get a new scope symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getScopeSymbol(...patterns: string[]): string;
    /**
     * Get a new reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Returns the pattern.
     */
    getReference(entries: Entries.Aggregator, name: string): string;
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    getAny(): string;
    /**
     * Get a new range pattern.
     * @param from From alphabet value.
     * @param to To alphabet value.
     * @returns Returns the pattern.
     */
    getRange(from: string | number, to: string | number): string;
    /**
     * Get a new alphabet pattern.
     * @param alphabet Input alphabet.
     * @returns Returns the alphabet pattern.
     */
    getAlphabet(alphabet: (string | number)[]): string;
}
export {};

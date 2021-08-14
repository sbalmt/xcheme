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
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getToken(identity: string | number, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNode(identity: string | number, output: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern;
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
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPlaceNode(current: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new pivot node pattern.
     * @param identity Node identity.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPivotNode(identity: string | number, pivot: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getAppendNode(identity: string | number, current: Core.Nodes, head: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getPrependNode(identity: string | number, current: Core.Nodes, head: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new symbol pattern.
     * @param identity Symbol identity.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSymbol(identity: string | number, symbol: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new scope symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getScopeSymbol(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getError(value: number, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getHas(state: number, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSet(state: number, ...patterns: Core.Pattern[]): Core.Pattern;
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

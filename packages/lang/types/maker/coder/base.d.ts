import * as Core from '@xcheme/core';
import * as Entries from '../common/entries';
/**
 * Pattern entry.
 */
export declare type PatternEntry = string | Core.Pattern;
/**
 * Route entry.
 */
export declare type RouteEntry = string | Core.Route;
/**
 * Pointer entry.
 */
export declare type PointerEntry = {
    /**
     * Entry name.
     */
    name: string;
    /**
     * Entry pattern.
     */
    pattern: PatternEntry;
};
/**
 * Common interface for any kind of coder.
 */
export declare class Base {
    /**
     * Should be implemented to return an entry pattern.
     * @param name Entry name.
     * @param pointers Entry pointers.
     * @param patterns Entry patterns.
     * @returns Should return the pattern.
     */
    getEntry(name: string, pointers: PointerEntry[], ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a route.
     * @param value Route value.
     * @param path Route path.
     * @returns Should return the route.
     */
    getRoute(value: number, path: (string | number)[]): RouteEntry;
    /**
     * Should be implemented to return a map pattern.
     * @param routes Map routes.
     * @returns Should return the pattern.
     */
    getMap(...routes: RouteEntry[]): PatternEntry;
    /**
     * Should be implemented to return a token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getToken(identity: string | number, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getNode(identity: string | number, output: Core.Nodes, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Should return the pattern.
     */
    getCondition(test: PatternEntry, success: PatternEntry, failure?: PatternEntry): PatternEntry;
    /**
     * Should be implemented to return a choose pattern.
     * @param patterns Possible patterns.
     * @returns Should return the pattern.
     */
    getChoose(...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a choose alphabet pattern.
     * @param alphabet Possible alphabet.
     * @returns Should return the pattern.
     */
    getChooseAlphabet(alphabet: (string | number)[]): PatternEntry;
    /**
     * Should be implemented to return an expect pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getExpect(...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return an expect unit pattern.
     * @param alphabet Expected alphabet.
     * @returns Should return the pattern.
     */
    getExpectAlphabet(alphabet: (string | number)[]): PatternEntry;
    /**
     * Should be implemented to return a negate pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getNegate(...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return an option pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    getOption(...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a repeat pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getRepeat(...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getPlaceNode(current: Core.Nodes, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a pivot node pattern.
     * @param identity Node identity.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    getPivotNode(identity: string | number, pivot: PatternEntry, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return an append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    getAppendNode(identity: string | number, current: Core.Nodes, head: PatternEntry, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    getPrependNode(identity: string | number, current: Core.Nodes, head: PatternEntry, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a symbol pattern.
     * @param value Symbol value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getSymbol(value: string | number, symbol: PatternEntry, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a scope symbol pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getScopeSymbol(...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return an error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getError(value: number, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getHas(state: number, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    getSet(state: number, ...patterns: PatternEntry[]): PatternEntry;
    /**
     * Should be implemented to return a reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Should return the pattern.
     */
    getReference(entries: Entries.Aggregator, name: string): PatternEntry;
    /**
     * Should be implemented to return an any pattern.
     * @returns Should return the pattern.
     */
    getAny(): PatternEntry;
    /**
     * Should be implemented to return a range pattern.
     * @param from From the alphabet value.
     * @param to To alphabet value.
     * @returns Should return the pattern.
     */
    getRange(from: string | number, to: string | number): PatternEntry;
    /**
     * Should be implemented to return an alphabet pattern.
     * @param alphabet Input alphabet.
     * @returns Should return the pattern.
     */
    getAlphabet(alphabet: (string | number)[]): PatternEntry;
}

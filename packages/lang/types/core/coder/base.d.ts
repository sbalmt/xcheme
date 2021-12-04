import * as Core from '@xcheme/core';
import * as Entries from '../../core/entries';
/**
 * Pattern entry.
 */
export declare type Pattern = string | Core.Pattern;
/**
 * Route entry.
 */
export declare type Route = string | Core.Route;
/**
 * Reference entry type.
 */
export declare type Reference = {
    /**
     * Reference name.
     */
    name: string;
    /**
     * Reference pattern.
     */
    pattern: Pattern;
};
/**
 * Common interface for any kind of coder.
 */
export declare class Base {
    /**
     * Should be implemented to return an entry pattern.
     * @param identifier Entry identifier.
     * @param references Entry references.
     * @param patterns Entry patterns.
     * @returns Should return the pattern.
     */
    getEntry(identifier: string, references: Reference[], patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a route.
     * @param path Route path.
     * @param value Optional route value.
     * @param pattern Optional route pattern.
     * @returns Should return the route.
     */
    getRoute(path: (string | number)[], value?: number, pattern?: Pattern): Route;
    /**
     * Should be implemented to return a map pattern.
     * @param routes Map routes.
     * @returns Should return the pattern.
     */
    emitMapPattern(...routes: Route[]): Pattern;
    /**
     * Should be implemented to return a token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitTokenPattern(identity: string | number, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNodePattern(identity: string | number, output: Core.Nodes, ...patterns: Pattern[]): Pattern;
    /**
     * Get a new identity pattern for dynamic directives.
     * @param identity New identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitIdentityPattern(identity: string | number, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Should return the pattern.
     */
    emitConditionPattern(test: Pattern, success: Pattern, failure?: Pattern): Pattern;
    /**
     * Should be implemented to return a choose pattern.
     * @param patterns Possible patterns.
     * @returns Should return the pattern.
     */
    emitChoosePattern(...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a choose units pattern.
     * @param units Possible units.
     * @returns Should return the pattern.
     */
    emitChooseUnitsPattern(units: (string | number)[]): Pattern;
    /**
     * Should be implemented to return an expect pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitExpectPattern(...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return an expect units pattern.
     * @param units Expected units.
     * @returns Should return the pattern.
     */
    emitExpectUnitsPattern(units: (string | number)[]): Pattern;
    /**
     * Should be implemented to return a not pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNotPattern(...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return an opt pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitOptPattern(...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a repeat pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitRepeatPattern(...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitPlacePattern(current: Core.Nodes, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return an append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitAppendPattern(identity: string | number, current: Core.Nodes, head: Pattern, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitPrependPattern(identity: string | number, current: Core.Nodes, head: Pattern, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a pivot node pattern.
     * @param identity Node identity.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitPivotPattern(identity: string | number, pivot: Pattern, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a symbol pattern.
     * @param value Symbol value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSymbolPattern(value: string | number, symbol: Pattern, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a symbol scope pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitScopePattern(...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return an error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitErrorPattern(value: number, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitHasPattern(state: number, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSetPattern(state: number, ...patterns: Pattern[]): Pattern;
    /**
     * Should be implemented to return a reference pattern.
     * @param entry Referenced entry.
     * @returns Should return the pattern.
     */
    emitReferencePattern(entry: Entries.Entry): Pattern;
    /**
     * Should be implemented to return an any pattern.
     * @returns Should return the pattern.
     */
    emitAnyPattern(): Pattern;
    /**
     * Should be implemented to return a range pattern.
     * @param from From unit value.
     * @param to To unit value.
     * @returns Should return the pattern.
     */
    emitRangePattern(from: string | number, to: string | number): Pattern;
}

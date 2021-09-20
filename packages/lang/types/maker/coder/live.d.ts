import * as Core from '@xcheme/core';
import * as Entries from '../../core/entries';
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
     * @param path Route path.
     * @param value Optional route value.
     * @param pattern Optional route pattern.
     * @returns Returns the route.
     */
    getRoute(path: (string | number)[], value?: number, pattern?: Core.Pattern): Core.Route;
    /**
     * Get a new map pattern.
     * @param routes Map routes.
     * @returns Returns the pattern.
     */
    emitMapPattern(...routes: Core.Route[]): Core.Pattern;
    /**
     * Get a new token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitTokenPattern(identity: string | number, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitNodePattern(identity: string | number, output: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    emitConditionPattern(test: Core.Pattern, success: Core.Pattern, failure?: Core.Pattern): Core.Pattern;
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    emitChoosePattern(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new choose units pattern.
     * @param units Possible units.
     * @returns Returns the pattern.
     */
    emitChooseUnitsPattern(units: (string | number)[]): Core.Pattern;
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitExpectPattern(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new expect units pattern.
     * @param units Expected units.
     * @returns Returns the pattern.
     */
    emitExpectUnitsPattern(units: (string | number)[]): Core.Pattern;
    /**
     * Get a new not pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitNotPattern(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * get a new opt pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitOptPattern(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitRepeatPattern(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPlacePattern(current: Core.Nodes, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitAppendPattern(identity: string | number, current: Core.Nodes, head: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitPrependPattern(identity: string | number, current: Core.Nodes, head: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new pivot node pattern.
     * @param identity Node identity.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPivotPattern(identity: string | number, pivot: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new symbol pattern.
     * @param identity Symbol identity.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitSymbolPattern(identity: string | number, symbol: Core.Pattern, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new symbol scope pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitScopePattern(...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitErrorPattern(value: number, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emiHasPattern(state: number, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitSetPattern(state: number, ...patterns: Core.Pattern[]): Core.Pattern;
    /**
     * Get a new reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Returns the pattern.
     */
    emitReferencePattern(entries: Entries.Aggregator, name: string): Core.Pattern;
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    emitAnyPattern(): Core.Pattern;
    /**
     * Get a new range pattern.
     * @param from From unit value.
     * @param to To unit value.
     * @returns Returns the pattern.
     */
    emitRangePattern(from: string | number, to: string | number): Core.Pattern;
}
export {};

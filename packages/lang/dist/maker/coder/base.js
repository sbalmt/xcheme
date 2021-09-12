"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
/**
 * Common interface for any kind of coder.
 */
class Base {
    /**
     * Should be implemented to return an entry pattern.
     * @param name Entry name.
     * @param pointers Entry pointers.
     * @param patterns Entry patterns.
     * @returns Should return the pattern.
     */
    getEntry(name, pointers, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a route.
     * @param path Route path.
     * @param value Optional route value.
     * @returns Should return the route.
     */
    getRoute(path, value) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a map pattern.
     * @param routes Map routes.
     * @returns Should return the pattern.
     */
    emitMapPattern(...routes) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitTokenPattern(identity, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNodePattern(identity, output, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Should return the pattern.
     */
    emitConditionPattern(test, success, failure) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a choose pattern.
     * @param patterns Possible patterns.
     * @returns Should return the pattern.
     */
    emitChoosePattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a choose units pattern.
     * @param units Possible units.
     * @returns Should return the pattern.
     */
    emitChooseUnitsPattern(units) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an expect pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitExpectPattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an expect units pattern.
     * @param units Expected units.
     * @returns Should return the pattern.
     */
    emitExpectUnitsPattern(units) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a not pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNotPattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an opt pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitOptPattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a repeat pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitRepeatPattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitPlacePattern(current, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitAppendPattern(identity, current, head, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitPrependPattern(identity, current, head, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a pivot node pattern.
     * @param identity Node identity.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitPivotPattern(identity, pivot, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a symbol pattern.
     * @param value Symbol value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSymbolPattern(value, symbol, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a symbol scope pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitScopePattern(...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitErrorPattern(value, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emiHasPattern(state, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSetPattern(state, ...patterns) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Should return the pattern.
     */
    emitReferencePattern(entries, name) {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return an any pattern.
     * @returns Should return the pattern.
     */
    emitAnyPattern() {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to return a range pattern.
     * @param from From unit value.
     * @param to To unit value.
     * @returns Should return the pattern.
     */
    emitRangePattern(from, to) {
        throw "Method doesn't implemented.";
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const exception_1 = require("../exception");
/**
 * Common interface for any kind of coder.
 */
class Base {
    /**
     * Should be implemented to return an entry pattern.
     * @param identifier Entry identifier.
     * @param references Entry references.
     * @param patterns Entry patterns.
     * @returns Should return the pattern.
     */
    getEntry(identifier, references, patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a route.
     * @param path Route path.
     * @param value Optional route value.
     * @param pattern Optional route pattern.
     * @returns Should return the route.
     */
    getRoute(path, value, pattern) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a map pattern.
     * @param routes Map routes.
     * @returns Should return the pattern.
     */
    emitMapPattern(...routes) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a token pattern.
     * @param identity Token identity.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitTokenPattern(identity, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNodePattern(identity, output, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Get a new identity pattern for dynamic directives.
     * @param identity New identity.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitIdentityPattern(identity, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Should return the pattern.
     */
    emitConditionPattern(test, success, failure) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a choose pattern.
     * @param patterns Possible patterns.
     * @returns Should return the pattern.
     */
    emitChoosePattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a choose units pattern.
     * @param units Possible units.
     * @returns Should return the pattern.
     */
    emitChooseUnitsPattern(units) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an expect pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitExpectPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an expect units pattern.
     * @param units Expected units.
     * @returns Should return the pattern.
     */
    emitExpectUnitsPattern(units) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a not pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitNotPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an opt pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitOptPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a repeat pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitRepeatPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitPlacePattern(current, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
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
        throw new exception_1.Exception("Method doesn't implemented.");
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
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a pivot node pattern.
     * @param identity Node identity.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Should return the pattern.
     */
    emitPivotPattern(identity, pivot, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a symbol pattern.
     * @param value Symbol value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSymbolPattern(value, symbol, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a symbol scope pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitScopePattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitErrorPattern(value, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitHasPattern(state, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitSetPattern(state, ...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an uncase pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitUncasePattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a peek pattern.
     * @param patterns Expected patterns.
     * @returns Should return the pattern.
     */
    emitPeekPattern(...patterns) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a reference pattern.
     * @param record Referenced record.
     * @returns Should return the pattern.
     */
    emitReferencePattern(record) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return an any pattern.
     * @returns Should return the pattern.
     */
    emitAnyPattern() {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
    /**
     * Should be implemented to return a range pattern.
     * @param from From unit value.
     * @param to To unit value.
     * @returns Should return the pattern.
     */
    emitRangePattern(from, to) {
        throw new exception_1.Exception("Method doesn't implemented.");
    }
}
exports.Base = Base;
//# sourceMappingURL=base.js.map
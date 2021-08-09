"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Live = void 0;
const Core = require("@xcheme/core");
const base_1 = require("./base");
/**
 * Generate a project output for running in memory.
 */
class Live extends base_1.Base {
    /**
     * Get a new entry pattern.
     * @param name Entry name.
     * @param pointers Entry pointers.
     * @param patterns Entry patterns.
     * @returns Returns the pattern.
     */
    getEntry(name, pointers, ...patterns) {
        return new Core.ExpectFlowPattern(new Core.OptionFlowPattern(new Core.RepeatFlowPattern(new Core.ChooseFlowPattern(...patterns))), new Core.EndFlowPattern());
    }
    /**
     * Get a new route.
     * @param value Route value.
     * @param path Route path.
     * @returns Returns the route.
     */
    getRoute(value, path) {
        return new Core.Route(new Core.SetValuePattern(value), ...path);
    }
    /**
     * Get a new skip pattern.
     * @param routes Skip routes.
     * @returns Returns the pattern.
     */
    getSkip(...routes) {
        return new Core.EmitTokenPattern(Core.BaseSource.Output, new Core.MapFlowPattern(...routes));
    }
    /**
     * Get a new token pattern.
     * @param value Token value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getToken(value, ...patterns) {
        return new Core.EmitTokenPattern(value, ...patterns);
    }
    /**
     * Get a new node pattern.
     * @param value Node value.
     * @param output Output node direction.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNode(value, output, ...patterns) {
        return new Core.EmitNodePattern(value, output, ...patterns);
    }
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    getCondition(test, success, failure) {
        return new Core.ConditionFlowPattern(test, success, failure);
    }
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    getChoose(...patterns) {
        return new Core.ChooseFlowPattern(...patterns);
    }
    /**
     * Get a new choose alphabet pattern.
     * @param alphabet Possible alphabet.
     * @returns Returns the pattern.
     */
    getChooseAlphabet(alphabet) {
        return new Core.ChooseUnitPattern(...alphabet);
    }
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getExpect(...patterns) {
        return new Core.ExpectFlowPattern(...patterns);
    }
    /**
     * Get a new expect alphabet pattern.
     * @param alphabet Expected alphabet.
     * @returns Returns the pattern.
     */
    getExpectAlphabet(alphabet) {
        return new Core.ExpectUnitPattern(...alphabet);
    }
    /**
     * Get a new negate pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNegate(...patterns) {
        return new Core.NegateFlowPattern(...patterns);
    }
    /**
     * get a new option pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getOption(...patterns) {
        return new Core.OptionFlowPattern(...patterns);
    }
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getRepeat(...patterns) {
        return new Core.RepeatFlowPattern(...patterns);
    }
    /**
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPlaceNode(current, ...patterns) {
        return new Core.PlaceNodePattern(current, ...patterns);
    }
    /**
     * Get a new pivot node pattern.
     * @param value Node value.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPivotNode(value, pivot, ...patterns) {
        return new Core.PivotNodePattern(value, 1 /* Right */, 0 /* Left */, pivot, ...patterns);
    }
    /**
     * Get a new append node pattern.
     * @param value Node value.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getAppendNode(value, current, head, ...patterns) {
        return new Core.AppendNodePattern(value, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new prepend node pattern.
     * @param value Node value.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getPrependNode(value, current, head, ...patterns) {
        return new Core.PrependNodePattern(value, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new symbol pattern.
     * @param value Symbol value.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSymbol(value, symbol, ...patterns) {
        return new Core.EmitSymbolPattern(value, symbol, ...patterns);
    }
    /**
     * Get a new scope symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getScopeSymbol(...patterns) {
        return new Core.ScopeSymbolPattern(...patterns);
    }
    /**
     * Get a new reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Returns the pattern.
     */
    getReference(entries, name) {
        const pointer = entries.get(name);
        if (!pointer) {
            return new Core.RunFlowPattern(() => entries.get(name).pattern);
        }
        return pointer.pattern;
    }
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    getAny() {
        return new Core.AnyUnitPattern();
    }
    /**
     * Get a new range pattern.
     * @param from From alphabet value.
     * @param to To alphabet value.
     * @returns Returns the pattern.
     */
    getRange(from, to) {
        return new Core.RangeUnitPattern(from, to);
    }
    /**
     * Get a new alphabet pattern.
     * @param alphabet Input alphabet.
     * @returns Returns the alphabet pattern.
     */
    getAlphabet(alphabet) {
        return new Core.ExpectUnitPattern(...alphabet);
    }
}
exports.Live = Live;
//# sourceMappingURL=live.js.map
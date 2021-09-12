"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const Core = require("@xcheme/core");
const String = require("../../core/string");
const base_1 = require("./base");
/**
 * Can generate a project output to be saved as a JavaScript source.
 */
class Text extends base_1.Base {
    /**
     * Get string units.
     * @param string Input string.
     * @returns Returns the string units.
     */
    #getUnits(string) {
        return string.map((unit) => (typeof unit !== 'number' ? String.compose(unit) : unit));
    }
    /**
     * Get a new pattern.
     * @param name Pattern name.
     * @param params Pattern parameters.
     * @returns Returns the pattern.
     */
    #getPattern(name, ...params) {
        return `new Core.${name}(${params.join(', ')})`;
    }
    /**
     * Get a new pointer entry.
     * @param name Pointer entry name.
     * @param pattern Pointer entry pattern.
     * @returns Returns the pointer entry.
     */
    #getPointerEntry(name, pattern) {
        return `const ${name} = ${pattern};`;
    }
    /**
     * Get a new export entry.
     * @param name Export entry name.
     * @param pattern Export entry pattern.
     * @returns Returns the export entry.
     */
    #getExportEntry(name, pattern) {
        return `exports.${name} = ${pattern};`;
    }
    /**
     * Get a new entry pattern.
     * @param name Entry name.
     * @param pointers Entry pointers.
     * @param patterns Entry patterns.
     * @returns Returns the pattern.
     */
    getEntry(name, pointers, ...patterns) {
        const deps = pointers.map((entry) => this.#getPointerEntry(entry.name, entry.pattern)).join('');
        return (deps +
            this.#getExportEntry(name, this.#getPattern('ExpectFlowPattern', this.#getPattern('OptFlowPattern', this.#getPattern('RepeatFlowPattern', this.#getPattern('ChooseFlowPattern', ...patterns))), this.#getPattern('EndFlowPattern'))));
    }
    /**
     * Get a new route.
     * @param path Route path.
     * @param value Optional route value.
     * @returns Returns the route.
     */
    getRoute(path, value) {
        if (value) {
            return this.#getPattern('SetValueRoute', value, ...this.#getUnits(path));
        }
        return this.#getPattern('UnitRoute', ...this.#getUnits(path));
    }
    /**
     * Get a new map pattern.
     * @param routes Map routes.
     * @returns Returns the pattern.
     */
    emitMapPattern(...routes) {
        return this.#getPattern('MapFlowPattern', ...routes);
    }
    /**
     * Get a new token pattern.
     * @param identity Token identity.
     * @param patterns Token patterns.
     * @returns Returns the pattern.
     */
    emitTokenPattern(identity, ...patterns) {
        return this.#getPattern('EmitTokenPattern', identity, ...patterns);
    }
    /**
     * Get a new node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Node patterns.
     * @returns Returns the pattern.
     */
    emitNodePattern(identity, output, ...patterns) {
        return this.#getPattern('EmitNodePattern', identity, output, ...patterns);
    }
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    emitConditionPattern(test, success, failure) {
        return this.#getPattern('ConditionFlowPattern', ...(failure ? [test, success, failure] : [test, success]));
    }
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    emitChoosePattern(...patterns) {
        return this.#getPattern('ChooseFlowPattern', ...patterns);
    }
    /**
     * Get a new choose units pattern.
     * @param units Possible units.
     * @returns Returns the pattern.
     */
    emitChooseUnitsPattern(units) {
        return this.#getPattern('ChooseUnitPattern', ...this.#getUnits(units));
    }
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitExpectPattern(...patterns) {
        return this.#getPattern('ExpectFlowPattern', ...patterns);
    }
    /**
     * Get a new expect units pattern.
     * @param units Expected units.
     * @returns Returns the pattern.
     */
    emitExpectUnitsPattern(units) {
        return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(units));
    }
    /**
     * Get a new not pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitNotPattern(...patterns) {
        return this.#getPattern('NotFlowPattern', ...patterns);
    }
    /**
     * get a new opt pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitOptPattern(...patterns) {
        return this.#getPattern('OptFlowPattern', ...patterns);
    }
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitRepeatPattern(...patterns) {
        return this.#getPattern('RepeatFlowPattern', ...patterns);
    }
    /**
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPlacePattern(current, ...patterns) {
        return this.#getPattern('PlaceNodePattern', current, ...patterns);
    }
    /**
     * Get a new append node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitAppendPattern(identity, current, head, ...patterns) {
        return this.#getPattern('AppendNodePattern', identity, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new prepend node pattern.
     * @param identity Node identity.
     * @param current Current node destination.
     * @param head Head pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    emitPrependPattern(identity, current, head, ...patterns) {
        return this.#getPattern('PrependNodePattern', identity, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new pivot node pattern.
     * @param identity Node identity.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitPivotPattern(identity, pivot, ...patterns) {
        return this.#getPattern('PivotNodePattern', identity, 1 /* Right */, 0 /* Left */, pivot, ...patterns);
    }
    /**
     * Get a new symbol pattern.
     * @param identity Symbol identity.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitSymbolPattern(identity, symbol, ...patterns) {
        return this.#getPattern('EmitSymbolPattern', identity, symbol, ...patterns);
    }
    /**
     * Get a new symbol scope pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitScopePattern(...patterns) {
        return this.#getPattern('ScopeSymbolPattern', ...patterns);
    }
    /**
     * Get a new error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitErrorPattern(value, ...patterns) {
        return this.#getPattern('EmitErrorPattern', value, ...patterns);
    }
    /**
     * Get a new has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emiHasPattern(state, ...patterns) {
        return this.#getPattern('HasStatePattern', state, ...patterns);
    }
    /**
     * Get a new set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    emitSetPattern(state, ...patterns) {
        return this.#getPattern('SetStatePattern', state, ...patterns);
    }
    /**
     * Get a new reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Returns the pattern.
     */
    emitReferencePattern(entries, name) {
        if (!entries.has(name)) {
            return this.#getPattern('RunFlowPattern', `() => ${name}`);
        }
        return name;
    }
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    emitAnyPattern() {
        return this.#getPattern('AnyUnitPattern');
    }
    /**
     * Get a new range pattern.
     * @param from From unit value.
     * @param to To unit value.
     * @returns Returns the pattern.
     */
    emitRangePattern(from, to) {
        return this.#getPattern('RangeUnitPattern', ...this.#getUnits([from, to]));
    }
}
exports.Text = Text;
//# sourceMappingURL=text.js.map
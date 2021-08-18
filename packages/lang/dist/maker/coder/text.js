"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const Core = require("@xcheme/core");
const String = require("../common/string");
const base_1 = require("./base");
/**
 * Can generate a project output to be saved as a JavaScript source.
 */
class Text extends base_1.Base {
    /**
     * Get alphabet units.
     * @param alphabet Input alphabet.
     * @returns Returns the alphabet units.
     */
    #getUnits(alphabet) {
        return alphabet.map((unit) => (typeof unit !== 'number' ? String.compose(unit) : unit));
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
     * @param value Route value.
     * @param path Route path.
     * @returns Returns the route.
     */
    getRoute(value, path) {
        return this.#getPattern('SetValueRoute', value, ...this.#getUnits(path));
    }
    /**
     * Get a new skip pattern.
     * @param routes Skip routes.
     * @returns Returns the pattern.
     */
    getSkip(...patterns) {
        return this.#getPattern('EmitTokenPattern', Core.BaseSource.Output, this.#getPattern('MapFlowPattern', ...patterns));
    }
    /**
     * Get a new token pattern.
     * @param identity Token identity.
     * @param patterns Token patterns.
     * @returns Returns the pattern.
     */
    getToken(identity, ...patterns) {
        return this.#getPattern('EmitTokenPattern', identity, ...patterns);
    }
    /**
     * Get a new node pattern.
     * @param identity Node identity.
     * @param output Output node direction.
     * @param patterns Node patterns.
     * @returns Returns the pattern.
     */
    getNode(identity, output, ...patterns) {
        return this.#getPattern('EmitNodePattern', identity, output, ...patterns);
    }
    /**
     * Get a new condition pattern.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     * @returns Returns the pattern.
     */
    getCondition(test, success, failure) {
        return this.#getPattern('ConditionFlowPattern', ...(failure ? [test, success, failure] : [test, success]));
    }
    /**
     * Get a new choose pattern.
     * @param patterns Possible patterns.
     * @returns Returns the pattern.
     */
    getChoose(...patterns) {
        return this.#getPattern('ChooseFlowPattern', ...patterns);
    }
    /**
     * Should be implemented to return a choose alphabet pattern.
     * @param alphabet Possible alphabet.
     * @returns Should return the pattern.
     */
    getChooseAlphabet(alphabet) {
        return this.#getPattern('ChooseUnitPattern', ...this.#getUnits(alphabet));
    }
    /**
     * Get a new expect pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getExpect(...patterns) {
        return this.#getPattern('ExpectFlowPattern', ...patterns);
    }
    /**
     * Get a new expect alphabet pattern.
     * @param alphabet Expected alphabet.
     * @returns Returns the pattern.
     */
    getExpectAlphabet(alphabet) {
        return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(alphabet));
    }
    /**
     * Get a new negate pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getNegate(...patterns) {
        return this.#getPattern('NotFlowPattern', ...patterns);
    }
    /**
     * get a new option pattern.
     * @param patterns Optional patterns.
     * @returns Returns the pattern.
     */
    getOption(...patterns) {
        return this.#getPattern('OptFlowPattern', ...patterns);
    }
    /**
     * Get a new repeat pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getRepeat(...patterns) {
        return this.#getPattern('RepeatFlowPattern', ...patterns);
    }
    /**
     * Get a new pivot node pattern.
     * @param identity Node identity.
     * @param pivot Pivot pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPivotNode(identity, pivot, ...patterns) {
        return this.#getPattern('PivotNodePattern', identity, 1 /* Right */, 0 /* Left */, pivot, ...patterns);
    }
    /**
     * Get a new place node pattern.
     * @param current Current node destination.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getPlaceNode(current, ...patterns) {
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
    getAppendNode(identity, current, head, ...patterns) {
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
    getPrependNode(identity, current, head, ...patterns) {
        return this.#getPattern('PrependNodePattern', identity, 1 /* Right */, current, head, ...patterns);
    }
    /**
     * Get a new symbol pattern.
     * @param identity Symbol identity.
     * @param symbol Symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSymbol(identity, symbol, ...patterns) {
        return this.#getPattern('EmitSymbolPattern', identity, symbol, ...patterns);
    }
    /**
     * Get a new scope symbol pattern.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getScopeSymbol(...patterns) {
        return this.#getPattern('ScopeSymbolPattern', ...patterns);
    }
    /**
     * Get a new error pattern.
     * @param value Error value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getError(value, ...patterns) {
        return this.#getPattern('EmitErrorPattern', value, ...patterns);
    }
    /**
     * Get a new has pattern.
     * @param state Expected state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getHas(state, ...patterns) {
        return this.#getPattern('HasStatePattern', state, ...patterns);
    }
    /**
     * Get a new set pattern.
     * @param state New state value.
     * @param patterns Expected patterns.
     * @returns Returns the pattern.
     */
    getSet(state, ...patterns) {
        return this.#getPattern('SetStatePattern', state, ...patterns);
    }
    /**
     * Get a new reference pattern.
     * @param entries Pointer entries.
     * @param name Reference name.
     * @returns Returns the pattern.
     */
    getReference(entries, name) {
        if (!entries.has(name)) {
            return this.#getPattern('RunFlowPattern', `() => ${name}`);
        }
        return name;
    }
    /**
     * Get a new any pattern.
     * @returns Returns the pattern.
     */
    getAny() {
        return this.#getPattern('AnyUnitPattern');
    }
    /**
     * Get a new range pattern.
     * @param from From alphabet value.
     * @param to To alphabet value.
     * @returns Returns the pattern.
     */
    getRange(from, to) {
        return this.#getPattern('RangeUnitPattern', ...this.#getUnits([from, to]));
    }
    /**
     * Get a new alphabet pattern.
     * @param alphabet Input alphabet.
     * @returns Returns the alphabet pattern.
     */
    getAlphabet(alphabet) {
        return this.#getPattern('ExpectUnitPattern', ...this.#getUnits(alphabet));
    }
}
exports.Text = Text;
//# sourceMappingURL=text.js.map
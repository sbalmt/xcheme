"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Core = require("@xcheme/core");
const Lexer = require("../../lexer");
/**
 * Directive pattern
 */
class Directive extends Core.Pattern {
    /**
     * Directive pattern.
     */
    #pattern;
    /**
     * Default constructor.
     * @param symbol Symbol value.
     * @param identity Identity pattern.
     * @param expression Expression pattern.
     */
    constructor(symbol, identity, expression) {
        super();
        this.#pattern = new Core.ExpectFlowPattern(new Core.OptFlowPattern(identity), new Core.EmitSymbolPattern(symbol, new Core.PivotNodePattern(200 /* Identifier */, 1 /* Right */, 0 /* Left */, new Core.ExpectUnitPattern(100 /* Identifier */)), new Core.ExpectUnitPattern(130 /* As */), new Core.PlaceNodePattern(1 /* Right */, expression)));
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        return this.#pattern.consume(source);
    }
}
exports.default = Directive;
//# sourceMappingURL=directive.js.map
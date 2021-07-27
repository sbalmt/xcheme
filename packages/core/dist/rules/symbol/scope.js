"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const expect_1 = require("../flow/expect");
/**
 * Consumes all the given patterns behind a new symbol table.
 */
class Scope extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.openTable();
        const status = this.#target.consume(source);
        source.closeTable();
        return status;
    }
}
exports.default = Scope;
//# sourceMappingURL=scope.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
/**
 * Doesn't consume anything, but it expects the end of the source.
 */
class End extends pattern_1.default {
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was ended, otherwise returns false.
     */
    consume(source) {
        return source.length === 0;
    }
}
exports.default = End;
//# sourceMappingURL=end.js.map
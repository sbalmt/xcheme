"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
/**
 * Consume one unit.
 */
class Any extends pattern_1.default {
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (source.length > 0) {
            source.move();
            return true;
        }
        return false;
    }
}
exports.default = Any;
//# sourceMappingURL=any.js.map
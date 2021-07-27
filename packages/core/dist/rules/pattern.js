"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base of any pattern class.
 */
class Pattern {
    /**
     * Should be implemented to consume the given source.
     * @param source Should receive the data source.
     * @returns Should returns true when the data source was consumed, otherwise should return false.
     */
    consume(source) {
        throw "Consume method doesn't implemented.";
    }
}
exports.default = Pattern;
//# sourceMappingURL=pattern.js.map
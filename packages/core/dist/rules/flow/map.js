"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const expect_1 = require("../unit/expect");
const try_1 = require("./try");
/**
 * Consumes the first route that match in the list of routes given for this pattern.
 */
class Map extends pattern_1.default {
    /**
     * List of routes.
     */
    #routes;
    /**
     * Default constructor.
     * @param routes List of routes.
     */
    constructor(...routes) {
        super();
        this.#routes = routes
            .sort((a, b) => b.units.length - a.units.length)
            .map((route) => ({
            test: new try_1.default(new expect_1.default(...route.units)),
            target: route.pattern
        }));
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        for (const route of this.#routes) {
            if (route.test.consume(source)) {
                return route.target.consume(source);
            }
        }
        return false;
    }
}
exports.default = Map;
//# sourceMappingURL=map.js.map
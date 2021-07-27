"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base of any route used together with routing patterns.
 */
class Route {
    /**
     * Route pattern.
     */
    #pattern;
    /**
     * Route units.
     */
    #units;
    /**
     * Default constructor.
     * @param pattern Route pattern.
     * @param units Route units.
     */
    constructor(pattern, ...units) {
        this.#pattern = pattern;
        this.#units = units;
    }
    /**
     * Get the route pattern.
     */
    get pattern() {
        return this.#pattern;
    }
    /**
     * Get the route units.
     */
    get units() {
        return this.#units;
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map
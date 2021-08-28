"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base of any route for using together with map patterns.
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
     * @param first First route unit.
     * @param units Remaining route units.
     */
    constructor(pattern, first, ...units) {
        this.#pattern = pattern;
        this.#units = [first, ...units];
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
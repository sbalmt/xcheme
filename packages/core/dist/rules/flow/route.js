"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
/**
 * Produce a route to consume units and, in case of success, it consumes the specified pattern.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param pattern Route pattern.
     * @param first First route unit.
     * @param units Route units.
     */
    constructor(pattern, first, ...units) {
        super(pattern, first, ...units);
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map
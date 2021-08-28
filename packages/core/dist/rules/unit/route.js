"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
/**
 * Produce a route to consume units.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param first First route unit.
     * @param units Route units.
     */
    constructor(first, ...units) {
        super(null, first, ...units);
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map
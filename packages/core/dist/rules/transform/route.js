"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
const uncase_1 = require("./uncase");
/**
 * Produce a route to consume all the given patterns with the uncase transformation.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param pattern Route pattern.
     * @param first First route unit.
     * @param units Route units.
     */
    constructor(pattern, first, ...units) {
        super(new uncase_1.default(pattern), first, ...units);
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map
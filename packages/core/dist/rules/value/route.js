"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
const pattern_1 = require("../pattern");
const set_1 = require("./set");
/**
 * Produce a route to consume units and in case of success it emits a new token.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value New value.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new set_1.default(value, first), ...units);
        }
        else {
            super(new set_1.default(value), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map
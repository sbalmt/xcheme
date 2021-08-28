"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
const pattern_1 = require("../pattern");
const emit_1 = require("./emit");
/**
 * Produce a route to consume units and, in case of success, it emits a new error.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Error value.
     * @param first Route pattern or first route unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, first), units[0], ...units.splice(1));
        }
        else {
            super(new emit_1.default(value), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map
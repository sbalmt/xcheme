"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
const pattern_1 = require("../pattern");
const emit_1 = require("./emit");
/**
 * Produce a route to consume units and, in case of success, it emits a new symbol record.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Symbol value.
     * @param test Symbol pattern.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value, test, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, test, first), ...units);
        }
        else {
            super(new emit_1.default(value, test), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
const pattern_1 = require("../pattern");
const emit_1 = require("./emit");
/**
 * Produce a route to consume units and, in case of success, it emits a new token.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Token value.
     * @param first Route pattern or first route unit.
     * @param units Route units.
     */
    constructor(value, first, ...units) {
        if (first instanceof pattern_1.default) {
            const [test, ...remaining] = units;
            super(new emit_1.default(value, first), test, ...remaining);
        }
        else {
            super(new emit_1.default(value), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map
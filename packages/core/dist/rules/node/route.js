"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../route");
const pattern_1 = require("../pattern");
const emit_1 = require("./emit");
/**
 * Produce a route to consume units and, in case of success, it emits a new node.
 * Any working node in the source output will be attached as the left child from the new node.
 */
class Route extends route_1.default {
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value, output, first, ...units) {
        if (first instanceof pattern_1.default) {
            super(new emit_1.default(value, output, first), ...units);
        }
        else {
            super(new emit_1.default(value, output), first, ...units);
        }
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map
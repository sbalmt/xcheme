"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Identity = require("./identity");
/**
 * Member node.
 */
class Node extends Identity.Node {
    /**
     * Symbol record.
     */
    #record;
    /**
     * Route node.
     */
    #route;
    /**
     * Default constructor.
     * @param node Original node.
     * @param record Symbol record.
     * @param route Route node.
     */
    constructor(node, record, route) {
        super(node, record.data.identity);
        this.#record = record;
        this.#route = route;
    }
    /**
     * Determines whether or not the member has a route.
     */
    get empty() {
        return this.#route.fragment === this.fragment;
    }
    /**
     * Get whether or not the member is dynamic.
     */
    get dynamic() {
        return this.#record.data.dynamic;
    }
    /**
     * Get the member route.
     */
    get route() {
        return this.#route;
    }
}
exports.Node = Node;
//# sourceMappingURL=member.js.map
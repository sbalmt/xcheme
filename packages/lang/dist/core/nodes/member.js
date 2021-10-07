"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Identity = require("./identity");
/**
 * Member node.
 */
class Node extends Identity.Node {
    /**
     * Node entry.
     */
    #entry;
    /**
     * Member route node.
     */
    #route;
    /**
     * Default constructor.
     * @param node Original node.
     * @param entry Node entry.
     * @param route Route node.
     */
    constructor(node, entry, route) {
        super(node, entry.identity);
        this.#entry = entry;
        this.#route = route;
    }
    /**
     * Get whether or not the directive can have a dynamic identity.
     */
    get dynamic() {
        return this.#entry.dynamic;
    }
    /**
     * Determines whether or not the member has a route.
     */
    get empty() {
        return this.#route.fragment === this.fragment;
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
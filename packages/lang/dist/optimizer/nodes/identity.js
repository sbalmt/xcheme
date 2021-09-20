"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Basic = require("./basic");
/**
 * Identity node.
 */
class Node extends Basic.Node {
    /**
     * Node identity.
     */
    #identity;
    /**
     * Determines whether or not the node can have a dynamic identity.
     */
    #dynamic;
    /**
     * Default constructor.
     * @param node Original node.
     * @param identity Node identity.
     * @param dynamic Determines whether or not the node can have a dynamic identity.
     */
    constructor(node, identity, dynamic) {
        super(node);
        this.#identity = identity;
        this.#dynamic = dynamic;
    }
    /**
     * Get the node identity.
     */
    get identity() {
        return this.#identity;
    }
    /**
     * Get whether or not the node can have a dynamic identity.
     */
    get dynamic() {
        return this.#dynamic;
    }
}
exports.Node = Node;
//# sourceMappingURL=identity.js.map
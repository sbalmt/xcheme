"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Basic = require("./basic");
/**
 * Identified node.
 */
class Node extends Basic.Node {
    /**
     * Node identity.
     */
    #identity;
    /**
     * Default constructor.
     * @param node Original node.
     * @param identity Node identity.
     */
    constructor(node, identity) {
        super(node);
        this.#identity = identity;
    }
    /**
     * Get the node identity.
     */
    get identity() {
        return this.#identity;
    }
}
exports.Node = Node;
//# sourceMappingURL=identified.js.map
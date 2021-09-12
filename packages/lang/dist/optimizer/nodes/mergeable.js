"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Basic = require("./basic");
/**
 * Mergeable node.
 */
class Node extends Basic.Node {
    /**
     * Sequence type.
     */
    #type;
    /**
     * Get all the mergeable nodes from the specified node in a sequence.
     * @param node Input node.
     * @returns Returns an array containing the mergeable sequence.
     */
    #getNodes(node) {
        if (this.value === node.value) {
            return [...this.#getNodes(node.left), ...this.#getNodes(node.right)];
        }
        return [node];
    }
    /**
     * Default constructor.
     * @param node Original node.
     * @param type Sequence type.
     */
    constructor(node, type) {
        super(node);
        this.#type = type;
    }
    /**
     * Get the sequence type.
     */
    get type() {
        return this.#type;
    }
    /**
     * Get the node sequence.
     */
    get sequence() {
        return this.#getNodes(this);
    }
}
exports.Node = Node;
//# sourceMappingURL=mergeable.js.map
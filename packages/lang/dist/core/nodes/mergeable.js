"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Core = require("@xcheme/core");
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
     * Sequence nodes.
     */
    #sequence;
    /**
     * Get all the mergeable nodes from the specified node in a sequence.
     * @param node Input node.
     * @returns Returns an array containing the sequence.
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
     * @param type Node sequence type.
     */
    constructor(node, type) {
        super(node);
        this.#type = type;
        this.#sequence = this.#getNodes(node);
        this.setChild(0 /* Left */, void 0);
        this.setChild(1 /* Right */, void 0);
        this.setChild(2 /* Next */, void 0);
    }
    /**
     * Get the node sequence type.
     */
    get type() {
        return this.#type;
    }
    /**
     * Get the nodes sequence.
     */
    get sequence() {
        return this.#sequence;
    }
}
exports.Node = Node;
//# sourceMappingURL=mergeable.js.map
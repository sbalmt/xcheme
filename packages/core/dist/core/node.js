"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A node product to compose the AST generated in the analysis process.
 */
class Node {
    /**
     * Node children.
     */
    #children = {};
    /**
     * Node fragment.
     */
    #fragment;
    /**
     * Node symbol table.
     */
    #table;
    /**
     * Node value.
     */
    #value;
    /**
     * Default constructor
     * @param fragment Node fragment.
     * @param table Node symbol table.
     * @param value Node value.
     */
    constructor(fragment, table, value) {
        this.#fragment = fragment;
        this.#table = table;
        this.#value = value;
    }
    /**
     * Get the node fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the symbol table associated to this node.
     */
    get table() {
        return this.#table;
    }
    /**
     * Get the node value.
     */
    get value() {
        return this.#value;
    }
    /**
     * Get the left child node.
     */
    get left() {
        return this.#children[0 /* Left */];
    }
    /**
     * Get the right child node.
     */
    get right() {
        return this.#children[1 /* Right */];
    }
    /**
     * Get the next child node.
     */
    get next() {
        return this.#children[2 /* Next */];
    }
    /**
     * Get a child node.
     * @param child Expected child.
     * @returns Return the corresponding child node.
     */
    getChild(child) {
        return this.#children[child];
    }
    /**
     * Set a new child node.
     * @param child Expected child.
     * @param node New child node.
     */
    setChild(child, node) {
        this.#children[child] = node;
    }
    /**
     * Get the lowest child node.
     * @param child Expected child.
     * @returns Returns the corresponding child node.
     */
    getLowestChild(child) {
        let current = this;
        let node;
        while ((current = current.getChild(child))) {
            node = current;
        }
        return node;
    }
}
exports.default = Node;
//# sourceMappingURL=node.js.map
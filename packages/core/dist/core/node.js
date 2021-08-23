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
     * Get the symbol table associated to the node.
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
     * Get the child node on the left.
     */
    get left() {
        return this.#children[0 /* Left */];
    }
    /**
     * Get the child node on the right.
     */
    get right() {
        return this.#children[1 /* Right */];
    }
    /**
     * Get the child node on the next.
     */
    get next() {
        return this.#children[2 /* Next */];
    }
    /**
     * Get a child node in the specified direction.
     * @param child Child node direction.
     * @returns Return the corresponding child node.
     */
    getChild(child) {
        return this.#children[child];
    }
    /**
     * Set the specified child node in the given direction.
     * @param child Child node direction.
     * @param node New child node.
     */
    setChild(child, node) {
        this.#children[child] = node;
    }
    /**
     * Get the lowest child node in the given direction.
     * @param child Child node direction.
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
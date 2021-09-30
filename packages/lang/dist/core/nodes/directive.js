"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Identity = require("./identity");
/**
 * Directive node.
 */
class Node extends Identity.Node {
    /**
     * Directive type.
     */
    #type;
    /**
     * Node entry.
     */
    #entry;
    /**
     * Default constructor.
     * @param node Original node.
     * @param type Directive type.
     * @param entry Node entry.
     */
    constructor(node, type, entry) {
        super(node, entry.identity, entry.dynamic);
        this.#type = type;
        this.#entry = entry;
    }
    /**
     * Get the directive type.
     */
    get type() {
        return this.#type;
    }
    /**
     * Get whether or not the directive is an alias.
     */
    get alias() {
        return this.#entry.alias;
    }
    /**
     * Get the directive identifier.
     */
    get identifier() {
        return this.#entry.identifier;
    }
}
exports.Node = Node;
//# sourceMappingURL=directive.js.map
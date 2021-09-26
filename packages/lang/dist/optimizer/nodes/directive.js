"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Identity = require("./identity");
/**
 * Directive node.
 */
class Node extends Identity.Node {
    /**
     * Node entry.
     */
    #entry;
    /**
     * Default constructor.
     * @param node Original node.
     * @param entry Node entry.
     */
    constructor(node, entry) {
        super(node, entry.identity, entry.dynamic);
        this.#entry = entry;
    }
    /**
     * Get whether or not the directive is an alias.
     */
    get alias() {
        return this.#entry.type === 2 /* Alias */;
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Identity = require("./identity");
/**
 * Directive node.
 */
class Node extends Identity.Node {
    /**
     * Determines whether or not the directive is an alias.
     */
    #alias;
    /**
     * Default constructor.
     * @param node Original node.
     * @param identity Node identity.
     * @param alias Determines whether or not the directive is an alias.
     */
    constructor(node, identity, alias) {
        super(node, identity);
        this.#alias = alias;
    }
    /**
     * Get whether or not the node is an alias.
     */
    get alias() {
        return this.#alias;
    }
    /**
     * Get the node name.
     */
    get name() {
        return this.fragment.data;
    }
}
exports.Node = Node;
//# sourceMappingURL=directive.js.map
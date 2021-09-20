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
     * @param dynamic Determines whether or not the directive can have a dynamic identity.
     * @param alias Determines whether or not the directive is an alias.
     */
    constructor(node, identity, dynamic, alias) {
        super(node, identity, dynamic);
        this.#alias = alias;
    }
    /**
     * Get whether or not the directive is an alias.
     */
    get alias() {
        return this.#alias;
    }
    /**
     * Get the directive name.
     */
    get name() {
        return this.fragment.data;
    }
}
exports.Node = Node;
//# sourceMappingURL=directive.js.map
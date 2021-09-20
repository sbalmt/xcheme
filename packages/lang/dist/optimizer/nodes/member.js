"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Identity = require("./identity");
/**
 * Member node.
 */
class Node extends Identity.Node {
    /**
     * Member entry.
     */
    #entry;
    /**
     * Default constructor.
     * @param node Original node.
     * @param identity Entry identity.
     * @param dynamic Determines whether or not the member can have a dynamic identity.
     * @param entry Entry node.
     */
    constructor(node, identity, dynamic, entry) {
        super(node, identity, dynamic);
        this.#entry = entry;
    }
    /**
     * Get the node entry.
     */
    get entry() {
        return this.#entry;
    }
}
exports.Node = Node;
//# sourceMappingURL=member.js.map
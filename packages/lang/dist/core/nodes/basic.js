"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Core = require("@xcheme/core");
/**
 * Basic node.
 */
class Node extends Core.Node {
    /**
     * Default constructor.
     * @param node Original node.
     */
    constructor(node) {
        super(node.fragment, node.value, node.table);
        this.setChild(0 /* Left */, node.left);
        this.setChild(1 /* Right */, node.right);
        this.setChild(2 /* Next */, node.next);
    }
    /**
     * Get the node value.
     */
    get value() {
        return super.value;
    }
}
exports.Node = Node;
//# sourceMappingURL=basic.js.map
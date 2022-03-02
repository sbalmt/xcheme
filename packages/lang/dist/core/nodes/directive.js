"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Parser = require("../../parser");
const Identified = require("./identified");
/**
 * Directive node.
 */
class Node extends Identified.Node {
    /**
     * Directive record.
     */
    #record;
    /**
     * Default constructor.
     * @param node Original node.
     * @param record Symbol record.
     */
    constructor(node, record) {
        super(node, record.data.identity);
        this.#record = record;
    }
    /**
     * Get the directive identifier.
     */
    get identifier() {
        return this.#record.fragment.data;
    }
    /**
     * Get the directive type.
     */
    get type() {
        return this.#record.data.type;
    }
    /**
     * Get whether or not the directive is an alias.
     */
    get alias() {
        return this.#record.value === 304 /* AliasNode */ || this.#record.value === 302 /* AliasToken */;
    }
}
exports.Node = Node;
//# sourceMappingURL=directive.js.map
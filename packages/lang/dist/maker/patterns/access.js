"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identified = require("../../core/nodes/identified");
/**
 * Consume the given node resolving the access pattern.
 * @param project Project context.
 * @param node Input node.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node) => {
    if (node instanceof Identified.Node) {
        return project.coder.emitExpectUnitsPattern([node.identity]);
    }
    project.addError(node.fragment, 4100 /* UNSUPPORTED_NODE */);
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=access.js.map
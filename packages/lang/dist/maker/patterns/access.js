"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Identity = require("../../optimizer/nodes/identity");
/**
 * Consume the specified input node resolving its access pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    if (node instanceof Identity.Node) {
        return project.coder.emitExpectUnitsPattern([node.identity]);
    }
    project.errors.push(new Core.Error(node.fragment, 4100 /* UNSUPPORTED_NODE */));
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=access.js.map
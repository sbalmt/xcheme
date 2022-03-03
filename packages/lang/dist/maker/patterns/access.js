"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identified = require("../../core/nodes/identified");
const exception_1 = require("../../core/exception");
/**
 * Consume the given node resolving the access pattern.
 * @param project Project context.
 * @param node Access node.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node) => {
    if (!(node instanceof Identified.Node)) {
        throw new exception_1.Exception('Access nodes must be instances of identified nodes.');
    }
    return project.coder.emitExpectUnitsPattern([node.identity]);
};
exports.consume = consume;
//# sourceMappingURL=access.js.map
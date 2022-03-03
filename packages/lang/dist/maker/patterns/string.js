"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const String = require("../../core/string");
const exception_1 = require("../../core/exception");
/**
 * Consume the given node resolving the string pattern.
 * @param project Project context.
 * @param node String node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node, state) => {
    if (state.directive.type !== 1 /* Skip */ && state.directive.type !== 2 /* Token */) {
        throw new exception_1.Exception(`String nodes can only be in a token or skip directive. ${state.directive.type}`);
    }
    const units = String.extract(node.fragment.data).split('');
    return project.coder.emitExpectUnitsPattern(units);
};
exports.consume = consume;
//# sourceMappingURL=string.js.map
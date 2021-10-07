"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const Mergeable = require("../../core/nodes/mergeable");
const String = require("../../core/string");
const Parser = require("../../parser");
const And = require("../patterns/and");
/**
 * Resolve the given node considering that the output will be used in a node emission pattern.
 * REMARKS: When emitting a node into the AST, the first pattern (a.k.a test pattern)
 * must be separate of the remaining patterns.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
const resolve = (project, node, state) => {
    if (node instanceof Mergeable.Node && node.sequence.length > 1) {
        const test = node.sequence.shift();
        const patterns = And.resolve(project, node, state);
        if (patterns !== void 0) {
            let units;
            if (node.type === 204 /* String */) {
                units = String.extract(test.fragment.data).split('');
            }
            else {
                units = [test.identity];
            }
            return [project.coder.emitExpectUnitsPattern(units), ...patterns];
        }
        return void 0;
    }
    return And.resolve(project, node, state);
};
exports.resolve = resolve;
//# sourceMappingURL=nodes.js.map
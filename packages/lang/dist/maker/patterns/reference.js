"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identified = require("../../core/nodes/identified");
const Parser = require("../../parser");
/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Referenced record symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project, node, record) => {
    if (record.value === 302 /* AliasToken */) {
        return project.coder.emitReferencePattern(record);
    }
    project.addError(node.fragment, 4100 /* UNSUPPORTED_NODE */);
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified record in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project, node, record) => {
    if (record.value === 301 /* Token */ || record.value === 302 /* AliasToken */) {
        return project.coder.emitReferencePattern(record);
    }
    project.addError(node.fragment, 4100 /* UNSUPPORTED_NODE */);
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified record in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param node Input node.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project, node, record) => {
    if (record.value === 303 /* Node */ || record.value === 304 /* AliasNode */) {
        return project.coder.emitReferencePattern(record);
    }
    if (node instanceof Identified.Node) {
        return project.coder.emitExpectUnitsPattern([node.identity]);
    }
    project.addError(node.fragment, 4100 /* UNSUPPORTED_NODE */);
    return void 0;
};
/**
 * Consume the given node resolving the reference pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const identifier = node.fragment.data;
    const record = node.table.find(identifier);
    if (record) {
        const directive = state.directive;
        switch (directive.type) {
            case 1 /* Skip */:
                return resolveSkip(project, node, record);
            case 2 /* Token */:
                return resolveToken(project, node, record);
            case 3 /* Node */:
                return resolveNode(project, node, record);
        }
    }
    project.addError(node.fragment, 4102 /* UNDEFINED_IDENTIFIER */);
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
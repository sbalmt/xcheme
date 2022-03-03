"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identified = require("../../core/nodes/identified");
const Parser = require("../../parser");
const exception_1 = require("../../core/exception");
/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param record Referenced record symbol.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveSkip = (project, record) => {
    if (record.value !== 302 /* AliasToken */) {
        throw new exception_1.Exception('Skip reference can only accept alias tokens references.');
    }
    return project.coder.emitReferencePattern(record);
};
/**
 * Resolve the corresponding reference for the specified record in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveToken = (project, record) => {
    if (record.value !== 301 /* Token */ && record.value !== 302 /* AliasToken */) {
        throw new exception_1.Exception('Token reference can only accept tokens and alias tokens references.');
    }
    return project.coder.emitReferencePattern(record);
};
/**
 * Resolve the corresponding reference for the specified record in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param node Reference node.
 * @param record Referenced record.
 * @returns Returns the corresponding reference pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveNode = (project, node, record) => {
    if (record.value !== 303 /* Node */ && record.value !== 304 /* AliasNode */) {
        if (!(node instanceof Identified.Node)) {
            throw new exception_1.Exception('Node reference can only accept tokens, nodes and alias nodes references.');
        }
        return project.coder.emitExpectUnitsPattern([node.identity]);
    }
    return project.coder.emitReferencePattern(record);
};
/**
 * Consume the given node resolving the reference pattern.
 * @param project Project context.
 * @param node Reference node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node, state) => {
    const identifier = node.fragment.data;
    const record = node.table.find(identifier);
    if (!record) {
        throw new exception_1.Exception(`Node reference ${identifier} doesn't exists in the symbol table.`);
    }
    const directive = state.directive;
    switch (directive.type) {
        case 1 /* Skip */:
            return resolveSkip(project, record);
        case 2 /* Token */:
            return resolveToken(project, record);
        case 3 /* Node */:
            return resolveNode(project, node, record);
        default:
            throw new exception_1.Exception(`Unsupported directive node type (${directive.type}).`);
    }
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
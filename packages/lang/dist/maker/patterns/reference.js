"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identity = require("../../core/nodes/identity");
const Parser = require("../../parser");
/**
 * Get the reference pattern for the given entry.
 * REMARKS: When the reference is used only once, the referenced pattern is returned instead of the reference pattern.
 * @param coder Project coder.
 * @param aggregator Entries aggregator.
 * @param entry Reference entry.
 * @returns Returns the reference pattern.
 */
const getReference = (coder, aggregator, entry) => {
    if (!entry.pattern || entry.references > 1) {
        return coder.emitReferencePattern(aggregator, entry.identifier);
    }
    return entry.pattern;
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project, node, symbol) => {
    if (symbol.value === 303 /* AliasToken */) {
        const identifier = node.fragment.data;
        const entry = project.tokenEntries.get(identifier);
        if (entry !== void 0) {
            return getReference(project.coder, project.tokenEntries, entry);
        }
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project, node, symbol) => {
    if (symbol.value === 300 /* Token */ || symbol.value === 303 /* AliasToken */) {
        const identifier = node.fragment.data;
        const entry = project.tokenEntries.get(identifier);
        if (entry !== void 0) {
            return getReference(project.coder, project.tokenEntries, entry);
        }
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project, node, symbol) => {
    if (symbol.value === 301 /* Node */ || symbol.value === 302 /* AliasNode */) {
        const identifier = node.fragment.data;
        const entry = project.nodeEntries.get(identifier);
        if (entry !== void 0) {
            return getReference(project.coder, project.nodeEntries, entry);
        }
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
    if (node instanceof Identity.Node) {
        return project.coder.emitExpectUnitsPattern([node.identity]);
    }
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
    const symbol = node.table.find(identifier);
    if (symbol !== void 0) {
        const directive = state.directive;
        switch (directive.type) {
            case 0 /* Skip */:
                return resolveSkip(project, node, symbol);
            case 1 /* Token */:
                return resolveToken(project, node, symbol);
            case 2 /* Node */:
                return resolveNode(project, node, symbol);
        }
    }
    project.addError(node, 4102 /* UNDEFINED_IDENTIFIER */);
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
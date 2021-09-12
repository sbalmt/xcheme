"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Parser = require("../../parser");
const Identity = require("../../optimizer/nodes/identity");
/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' pattern context.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project, node, state, symbol) => {
    if (symbol.value === 300 /* Token */ || symbol.value === 303 /* AliasToken */) {
        const identifier = node.fragment.data;
        if (state.pointers.has(identifier)) {
            return project.coder.emitReferencePattern(project.tokenPointerEntries, identifier);
        }
        const token = project.tokenEntries.get(identifier);
        if (token !== void 0) {
            project.tokenPointerEntries.add(0 /* Normal */, identifier, token.identity, token.pattern);
        }
        state.pointers.add(identifier);
        return project.coder.emitReferencePattern(project.tokenPointerEntries, identifier);
    }
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' pattern context.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project, node, state, symbol) => {
    if (node instanceof Identity.Node) {
        return project.coder.emitExpectUnitsPattern([node.identity]);
    }
    else if (symbol.value === 301 /* Node */ || symbol.value === 302 /* AliasNode */) {
        const identifier = node.fragment.data;
        if (state.pointers.has(identifier)) {
            return project.coder.emitReferencePattern(project.nodePointerEntries, identifier);
        }
        const entry = project.nodeEntries.get(identifier);
        if (entry !== void 0) {
            project.nodePointerEntries.add(0 /* Normal */, identifier, entry.identity, entry.pattern);
        }
        state.pointers.add(identifier);
        return project.coder.emitReferencePattern(project.nodePointerEntries, identifier);
    }
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' pattern context.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project, node, state, symbol) => {
    if (symbol.value === 303 /* AliasToken */) {
        const identifier = node.fragment.data;
        if (state.pointers.has(identifier)) {
            return project.coder.emitReferencePattern(project.tokenPointerEntries, identifier);
        }
        const entry = project.tokenEntries.get(identifier);
        if (entry !== void 0) {
            project.tokenPointerEntries.add(0 /* Normal */, identifier, entry.identity, entry.pattern);
        }
        state.pointers.add(identifier);
        return project.coder.emitReferencePattern(project.tokenPointerEntries, identifier);
    }
    return void 0;
};
/**
 * Consume the specified input node resolving its reference pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const name = node.fragment.data;
    const symbol = node.table?.get(name);
    if (symbol !== void 0) {
        switch (state.type) {
            case 1 /* Token */:
                return resolveToken(project, node, state, symbol);
            case 2 /* Node */:
                return resolveNode(project, node, state, symbol);
            case 0 /* Skip */:
                return resolveSkip(project, node, state, symbol);
        }
    }
    project.errors.push(new Core.Error(node.fragment, 4101 /* UNDEFINED_IDENTIFIER */));
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
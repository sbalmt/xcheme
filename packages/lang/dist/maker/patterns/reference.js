"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Parser = require("../../parser");
/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' pattern context.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveToken = (project, node, state, symbol) => {
    const name = node.fragment.data;
    if (symbol.value !== 300 /* Token */) {
        project.errors.push(new Core.Error(node.fragment, 4100 /* INVALID_NODE_REFERENCE */));
        return void 0;
    }
    if (state.pointers.has(name)) {
        return project.coder.emitReferencePattern(project.tokenPointerEntries, name);
    }
    const token = project.tokenEntries.get(name);
    if (token) {
        project.tokenPointerEntries.add(token.identity, name, token.pattern, 0 /* Normal */);
    }
    state.pointers.add(name);
    return project.coder.emitReferencePattern(project.tokenPointerEntries, name);
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' pattern context.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveNode = (project, node, state, symbol) => {
    const name = node.fragment.data;
    if (symbol.value === 301 /* Node */) {
        if (state.pointers.has(name)) {
            return project.coder.emitReferencePattern(project.nodePointerEntries, name);
        }
        const node = project.nodeEntries.get(name);
        if (node) {
            project.nodePointerEntries.add(node.identity, name, node.pattern, 0 /* Normal */);
        }
        state.pointers.add(name);
        return project.coder.emitReferencePattern(project.nodePointerEntries, name);
    }
    const token = project.tokenEntries.get(name);
    if (!token) {
        project.errors.push(new Core.Error(node.fragment, 4104 /* UNRESOLVED_TOKEN_REFERENCE */));
    }
    else {
        if (token.type !== 1 /* Alias */) {
            return project.coder.emitStringPattern([token.identity]);
        }
        project.errors.push(new Core.Error(node.fragment, 4103 /* INVALID_ALIAS_TOKEN_REFERENCE */));
    }
    return void 0;
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'SKIP' pattern context.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 * @returns Returns the corresponding reference pattern or undefined when the reference isn't valid.
 */
const resolveSkip = (project, node, state, symbol) => {
    const name = node.fragment.data;
    if (symbol.value === 301 /* Node */) {
        project.errors.push(new Core.Error(node.fragment, 4100 /* INVALID_NODE_REFERENCE */));
    }
    else {
        const token = project.tokenEntries.get(name);
        if (!token) {
            project.errors.push(new Core.Error(node.fragment, 4104 /* UNRESOLVED_TOKEN_REFERENCE */));
        }
        else {
            if (token.type === 1 /* Alias */) {
                if (state.pointers.has(name)) {
                    return project.coder.emitReferencePattern(project.tokenPointerEntries, name);
                }
                state.pointers.add(name);
                project.tokenPointerEntries.add(token.identity, name, token.pattern, 0 /* Normal */);
                return project.coder.emitReferencePattern(project.tokenPointerEntries, name);
            }
            project.errors.push(new Core.Error(node.fragment, 4101 /* INVALID_TOKEN_REFERENCE */));
        }
    }
    return void 0;
};
/**
 * Consume the specified input node resolving its reference pattern.
 * It can also update the given project and context state when a new pointer is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const name = node.fragment.data;
    const symbol = node.table?.get(name);
    if (symbol) {
        if (state.type === 1 /* Token */) {
            return resolveToken(project, node, state, symbol);
        }
        else if (state.type === 2 /* Node */) {
            return resolveNode(project, node, state, symbol);
        }
        else {
            return resolveSkip(project, node, state, symbol);
        }
    }
    project.errors.push(new Core.Error(node.fragment, 4105 /* UNDEFINED_IDENTIFIER */));
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
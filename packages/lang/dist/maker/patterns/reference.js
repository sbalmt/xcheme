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
    let pattern;
    if (symbol.value === 300 /* Token */ || symbol.value === 301 /* AliasToken */) {
        const name = node.fragment.data;
        if (state.pointers.has(name)) {
            pattern = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
        }
        else {
            const token = project.tokenEntries.get(name);
            if (token) {
                project.tokenPointerEntries.add(token.identity, name, token.pattern, 0 /* Normal */);
            }
            pattern = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
            state.pointers.add(name);
        }
    }
    else if (symbol.value === 302 /* Node */) {
        project.errors.push(new Core.Error(node.fragment, 4102 /* INVALID_NODE_REFERENCE */));
    }
    else if (symbol.value === 303 /* AliasNode */) {
        project.errors.push(new Core.Error(node.fragment, 4104 /* INVALID_ALIAS_NODE_REFERENCE */));
    }
    else {
        project.errors.push(new Core.Error(node.fragment, 4101 /* UNRESOLVED_IDENTIFIER */));
    }
    return pattern;
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
    let pattern;
    if (symbol.value === 302 /* Node */ || symbol.value === 303 /* AliasNode */) {
        const name = node.fragment.data;
        if (state.pointers.has(name)) {
            pattern = project.coder.emitReferencePattern(project.nodePointerEntries, name);
        }
        else {
            const entry = project.nodeEntries.get(name);
            if (entry) {
                project.nodePointerEntries.add(entry.identity, name, entry.pattern, 0 /* Normal */);
            }
            pattern = project.coder.emitReferencePattern(project.nodePointerEntries, name);
            state.pointers.add(name);
        }
    }
    else if (symbol.value === 300 /* Token */) {
        const name = node.fragment.data;
        const token = project.tokenEntries.get(name);
        if (!token) {
            project.errors.push(new Core.Error(node.fragment, 4106 /* UNRESOLVED_TOKEN_REFERENCE */));
        }
        else {
            pattern = project.coder.emitStringPattern([token.identity]);
        }
    }
    else if (symbol.value === 301 /* AliasToken */) {
        project.errors.push(new Core.Error(node.fragment, 4105 /* INVALID_ALIAS_TOKEN_REFERENCE */));
    }
    else {
        project.errors.push(new Core.Error(node.fragment, 4101 /* UNRESOLVED_IDENTIFIER */));
    }
    return pattern;
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
    let pattern;
    if (symbol.value === 301 /* AliasToken */) {
        const name = node.fragment.data;
        if (state.pointers.has(name)) {
            pattern = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
        }
        else {
            const token = project.tokenEntries.get(name);
            if (!token) {
                project.errors.push(new Core.Error(node.fragment, 4106 /* UNRESOLVED_TOKEN_REFERENCE */));
            }
            else {
                project.tokenPointerEntries.add(token.identity, name, token.pattern, 0 /* Normal */);
                pattern = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
                state.pointers.add(name);
            }
        }
    }
    else if (symbol.value === 300 /* Token */) {
        project.errors.push(new Core.Error(node.fragment, 4103 /* INVALID_TOKEN_REFERENCE */));
    }
    else if (symbol.value === 302 /* Node */) {
        project.errors.push(new Core.Error(node.fragment, 4102 /* INVALID_NODE_REFERENCE */));
    }
    else if (symbol.value === 303 /* AliasNode */) {
        project.errors.push(new Core.Error(node.fragment, 4104 /* INVALID_ALIAS_NODE_REFERENCE */));
    }
    else {
        project.errors.push(new Core.Error(node.fragment, 4101 /* UNRESOLVED_IDENTIFIER */));
    }
    return pattern;
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
        switch (state.type) {
            case 1 /* Token */:
                return resolveToken(project, node, state, symbol);
            case 2 /* Node */:
                return resolveNode(project, node, state, symbol);
            case 0 /* Skip */:
                return resolveSkip(project, node, state, symbol);
        }
    }
    project.errors.push(new Core.Error(node.fragment, 4100 /* UNDEFINED_IDENTIFIER */));
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
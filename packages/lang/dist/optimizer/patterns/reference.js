"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identity = require("../../core/nodes/identity");
const Parser = require("../../parser");
/**
 * Update the specified node for an optimized one after resolving its reference.
 * @param project Project context.
 * @param entry Referenced entry.
 * @param parent Parent node.
 * @param node Reference node.
 * @param direction Node direction.
 */
const updateNode = (project, entry, parent, node, direction) => {
    if (!entry.dynamic) {
        parent.setChild(direction, new Identity.Node(node, entry.identity));
    }
    else {
        project.addError(node, 4112 /* INVALID_MAP_REFERENCE */);
    }
};
/**
 * Find and link the corresponding reference for the specified node.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the dependency entry or undefined the dependency isn't ready yet.
 */
const linkReference = (project, node, state) => {
    const identifier = node.fragment.data;
    const dependency = project.local.get(identifier);
    if (dependency) {
        project.local.on(state.entry.identifier, (entry) => {
            entry.dependencies.push(dependency);
            dependency.dependents.push(entry);
        });
    }
    else {
        project.local.on(identifier, (dependency) => {
            const entry = project.local.get(state.entry.identifier);
            entry.dependencies.push(dependency);
            dependency.dependents.push(entry);
        });
    }
    return dependency;
};
/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @param state Consumption state.
 */
const resolveSkip = (project, node, symbol, state) => {
    if (symbol.value === 303 /* AliasToken */) {
        linkReference(project, node, state);
    }
    else if (symbol.value === 300 /* Token */) {
        project.addError(node, 4108 /* INVALID_TOKEN_REFERENCE */);
    }
    else if (symbol.value === 302 /* AliasNode */) {
        project.addError(node, 4111 /* INVALID_ALIAS_NODE_REFERENCE */);
    }
    else if (symbol.value === 301 /* Node */) {
        project.addError(node, 4109 /* INVALID_NODE_REFERENCE */);
    }
    else {
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @param state Consumption state.
 */
const resolveToken = (project, node, symbol, state) => {
    if (symbol.value === 300 /* Token */ || symbol.value === 303 /* AliasToken */) {
        linkReference(project, node, state);
    }
    else if (symbol.value === 301 /* Node */) {
        project.addError(node, 4109 /* INVALID_NODE_REFERENCE */);
    }
    else if (symbol.value === 302 /* AliasNode */) {
        project.addError(node, 4111 /* INVALID_ALIAS_NODE_REFERENCE */);
    }
    else {
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param symbol Referenced symbol.
 * @param state Consumption state.
 */
const resolveNode = (project, direction, parent, symbol, state) => {
    const node = parent.getChild(direction);
    if (symbol.value === 301 /* Node */ || symbol.value === 302 /* AliasNode */) {
        linkReference(project, node, state);
    }
    else if (symbol.value === 300 /* Token */) {
        const dependency = linkReference(project, node, state);
        if (dependency) {
            updateNode(project, dependency, parent, node, direction);
        }
        else {
            project.local.on(node.fragment.data, (entry) => {
                updateNode(project, entry, parent, node, direction);
            });
        }
    }
    else if (symbol.value === 303 /* AliasToken */) {
        project.addError(node, 4110 /* INVALID_ALIAS_TOKEN_REFERENCE */);
    }
    else {
        project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Consume a child node from the AST on the given parent and optimize the reference pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const identifier = node.fragment.data;
    const symbol = node.table.find(identifier);
    if (!symbol) {
        project.addError(node, 4102 /* UNDEFINED_IDENTIFIER */);
    }
    else {
        switch (state.entry.type) {
            case 1 /* Skip */:
                resolveSkip(project, node, symbol, state);
                break;
            case 2 /* Token */:
                resolveToken(project, node, symbol, state);
                break;
            case 3 /* Node */:
                resolveNode(project, direction, parent, symbol, state);
                break;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Parser = require("../../parser");
const Identity = require("../nodes/identity");
/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' pattern context.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Input project.
 * @param node Input node.
 * @param symbol Input symbol.
 */
const resolveToken = (project, node, symbol) => {
    if (symbol.value !== 300 /* Token */ && symbol.value !== 303 /* AliasToken */) {
        if (symbol.value === 301 /* Node */) {
            project.errors.push(new Core.Error(node.fragment, 4103 /* INVALID_NODE_REFERENCE */));
        }
        else if (symbol.value === 302 /* AliasNode */) {
            project.errors.push(new Core.Error(node.fragment, 4105 /* INVALID_ALIAS_NODE_REFERENCE */));
        }
        else {
            project.errors.push(new Core.Error(node.fragment, 4102 /* UNRESOLVED_IDENTIFIER */));
        }
    }
};
/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' pattern context.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 */
const resolveNode = (project, direction, parent, state, symbol) => {
    if (symbol.value !== 301 /* Node */ && symbol.value !== 302 /* AliasNode */) {
        const node = parent.getChild(direction);
        if (symbol.value === 300 /* Token */) {
            const identifier = node.fragment.data;
            const entry = state.references[identifier];
            if (entry !== void 0) {
                parent.setChild(direction, new Identity.Node(node, entry.identity));
            }
            else {
                project.errors.push(new Core.Error(node.fragment, 4107 /* UNRESOLVED_TOKEN_REFERENCE */));
            }
        }
        else if (symbol.value === 303 /* AliasToken */) {
            project.errors.push(new Core.Error(node.fragment, 4106 /* INVALID_ALIAS_TOKEN_REFERENCE */));
        }
        else {
            project.errors.push(new Core.Error(node.fragment, 4102 /* UNRESOLVED_IDENTIFIER */));
        }
    }
};
/**
 * Validate the corresponding reference for the specified symbol in a 'SKIP' pattern context.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 */
const resolveSkip = (project, node, state, symbol) => {
    if (symbol.value !== 303 /* AliasToken */) {
        if (symbol.value === 300 /* Token */) {
            project.errors.push(new Core.Error(node.fragment, 4104 /* INVALID_TOKEN_REFERENCE */));
        }
        else if (symbol.value === 301 /* Node */) {
            project.errors.push(new Core.Error(node.fragment, 4103 /* INVALID_NODE_REFERENCE */));
        }
        else if (symbol.value === 302 /* AliasNode */) {
            project.errors.push(new Core.Error(node.fragment, 4105 /* INVALID_ALIAS_NODE_REFERENCE */));
        }
        else {
            project.errors.push(new Core.Error(node.fragment, 4102 /* UNRESOLVED_IDENTIFIER */));
        }
    }
};
/**
 * Consume the specified input node resolving its reference pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const symbol = node.table?.get(node.fragment.data);
    if (!symbol) {
        project.errors.push(new Core.Error(node.fragment, 4101 /* UNDEFINED_IDENTIFIER */));
    }
    else {
        switch (state.type) {
            case 2 /* Token */:
                resolveToken(project, node, symbol);
                break;
            case 3 /* Node */:
                resolveNode(project, direction, parent, state, symbol);
                break;
            case 1 /* Skip */:
                resolveSkip(project, node, state, symbol);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
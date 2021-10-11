"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identity = require("../../core/nodes/identity");
const Parser = require("../../parser");
/**
 * Validate the corresponding reference for the specified symbol and node in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 */
const resolveSkip = (project, node, symbol) => {
    if (symbol.value !== 303 /* AliasToken */) {
        if (symbol.value === 300 /* Token */) {
            project.addError(node, 4108 /* INVALID_TOKEN_REFERENCE */);
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
    }
    else {
        const identifier = node.fragment.data;
        const entry = project.tokenEntries.get(identifier);
        if (entry !== void 0) {
            entry.references++;
        }
        else {
            project.tokenEntries.on(identifier, (entry) => {
                entry.references++;
                entry.force = true;
            });
        }
    }
};
/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 */
const resolveToken = (project, node, symbol) => {
    if (symbol.value !== 300 /* Token */ && symbol.value !== 303 /* AliasToken */) {
        if (symbol.value === 301 /* Node */) {
            project.addError(node, 4109 /* INVALID_NODE_REFERENCE */);
        }
        else if (symbol.value === 302 /* AliasNode */) {
            project.addError(node, 4111 /* INVALID_ALIAS_NODE_REFERENCE */);
        }
        else {
            project.addError(node, 4103 /* UNRESOLVED_IDENTIFIER */);
        }
    }
    else {
        const identifier = node.fragment.data;
        const entry = project.tokenEntries.get(identifier);
        if (entry !== void 0) {
            entry.references++;
        }
        else {
            project.tokenEntries.on(identifier, (entry) => {
                entry.references++;
                entry.force = true;
            });
        }
    }
};
/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param symbol Referenced symbol.
 */
const resolveNode = (project, direction, parent, symbol) => {
    const node = parent.getChild(direction);
    const identifier = node.fragment.data;
    if (symbol.value === 301 /* Node */ || symbol.value === 302 /* AliasNode */) {
        const entry = project.nodeEntries.get(identifier);
        if (entry !== void 0) {
            entry.references++;
        }
        else {
            project.nodeEntries.on(identifier, (entry) => {
                entry.references++;
                entry.force = true;
            });
        }
    }
    else if (symbol.value === 300 /* Token */) {
        const entry = project.tokenEntries.get(identifier);
        if (entry !== void 0) {
            entry.references++;
            if (!entry.dynamic) {
                parent.setChild(direction, new Identity.Node(node, entry.identity));
            }
            else {
                project.addError(node, 4112 /* INVALID_MAP_REFERENCE */);
            }
        }
        else {
            project.tokenEntries.on(identifier, (entry) => {
                entry.references++;
                entry.force = true;
                if (!entry.dynamic) {
                    parent.setChild(direction, new Identity.Node(node, entry.identity));
                }
                else {
                    project.addError(node, 4112 /* INVALID_MAP_REFERENCE */);
                }
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
    if (symbol === void 0) {
        project.addError(node, 4102 /* UNDEFINED_IDENTIFIER */);
    }
    else {
        switch (state.type) {
            case 1 /* Skip */:
                resolveSkip(project, node, symbol);
                break;
            case 2 /* Token */:
                resolveToken(project, node, symbol);
                break;
            case 3 /* Node */:
                resolveNode(project, direction, parent, symbol);
                break;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
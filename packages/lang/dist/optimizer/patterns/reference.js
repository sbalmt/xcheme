"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identified = require("../../core/nodes/identified");
const Parser = require("../../parser");
/**
 * Update the specified node for an optimized one after resolving its reference.
 * @param project Project context.
 * @param record Reference record.
 * @param parent Parent node.
 * @param direction Node direction.
 */
const upgrade = (project, record, parent, direction) => {
    const node = parent.getChild(direction);
    if (!record.data.dynamic) {
        parent.setChild(direction, new Identified.Node(node, record.data.identity));
    }
    else {
        project.addError(node.fragment, 4112 /* INVALID_MAP_REFERENCE */);
    }
};
/**
 * Find and connect the corresponding reference for the specified record.
 * @param project Project context.
 * @param identifier Reference identifier.
 * @param record Reference record.
 * @param state Consumption state.
 */
const connect = (project, identifier, record, state) => {
    const current = state.record;
    if (record.data.dependencies) {
        current.data.dependencies.push(record);
        record.data.dependents.push(current);
    }
    else {
        project.symbols.listen(identifier, () => {
            current.data.dependencies.push(record);
            record.data.dependents.push(current);
        });
    }
};
/**
 * Resolve and validate the corresponding reference for the specified record and node in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveSkip = (project, node, record, state) => {
    if (record.value === 302 /* AliasToken */) {
        connect(project, node.fragment.data, record, state);
    }
    else if (record.value === 301 /* Token */) {
        project.addError(node.fragment, 4108 /* INVALID_TOKEN_REFERENCE */);
    }
    else if (record.value === 304 /* AliasNode */) {
        project.addError(node.fragment, 4111 /* INVALID_ALIAS_NODE_REFERENCE */);
    }
    else if (record.value === 303 /* Node */) {
        project.addError(node.fragment, 4109 /* INVALID_NODE_REFERENCE */);
    }
    else {
        project.addError(node.fragment, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Resolve and validate the corresponding reference for the specified record and node in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param record Reference record.
 * @param state Consumption state.
 */
const resolveToken = (project, node, record, state) => {
    if (record.value === 301 /* Token */ || record.value === 302 /* AliasToken */) {
        connect(project, node.fragment.data, record, state);
    }
    else if (record.value === 303 /* Node */) {
        project.addError(node.fragment, 4109 /* INVALID_NODE_REFERENCE */);
    }
    else if (record.value === 304 /* AliasNode */) {
        project.addError(node.fragment, 4111 /* INVALID_ALIAS_NODE_REFERENCE */);
    }
    else {
        project.addError(node.fragment, 4103 /* UNRESOLVED_IDENTIFIER */);
    }
};
/**
 * Resolve and validate the corresponding reference for the specified record and node in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param record Referenced record.
 * @param state Consumption state.
 */
const resolveNode = (project, direction, parent, record, state) => {
    const node = parent.getChild(direction);
    const identifier = node.fragment.data;
    if (record.value === 303 /* Node */ || record.value === 304 /* AliasNode */) {
        connect(project, identifier, record, state);
    }
    else if (record.value === 301 /* Token */) {
        connect(project, identifier, record, state);
        if (record.data.dynamic !== void 0) {
            upgrade(project, record, parent, direction);
        }
        else {
            project.symbols.listen(identifier, () => {
                upgrade(project, record, parent, direction);
            });
        }
    }
    else if (record.value === 302 /* AliasToken */) {
        project.addError(node.fragment, 4110 /* INVALID_ALIAS_TOKEN_REFERENCE */);
    }
    else {
        project.addError(node.fragment, 4103 /* UNRESOLVED_IDENTIFIER */);
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
    const record = node.table.find(node.fragment.data);
    if (!record) {
        project.addError(node.fragment, 4102 /* UNDEFINED_IDENTIFIER */);
    }
    else {
        switch (state.type) {
            case 1 /* Skip */:
                resolveSkip(project, node, record, state);
                break;
            case 2 /* Token */:
                resolveToken(project, node, record, state);
                break;
            case 3 /* Node */:
                resolveNode(project, direction, parent, record, state);
                break;
            default:
                throw `Unsupported context state type: ${state.type}`;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=reference.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const Parser = require("../../parser");
/**
 * Get an entry that corresponds to the specified symbol
 * @param project Project context.
 * @param symbol Entry symbol.
 * @returns Returns the corresponding entry or undefined when there are no entries matching the symbol name.
 */
const getEntry = (project, symbol) => {
    const entry = project.local.get(symbol.fragment.data);
    if (!entry) {
        if (symbol.value === 301 /* Node */ || symbol.value === 302 /* AliasNode */) {
            project.addError(symbol.node, 4105 /* UNRESOLVED_NODE_REFERENCE */);
        }
        else if (symbol.value === 300 /* Token */ || symbol.value === 303 /* AliasToken */) {
            project.addError(symbol.node, 4104 /* UNRESOLVED_TOKEN_REFERENCE */);
        }
        else {
            project.addError(symbol.node, 4115 /* INVALID_EXPORT */);
        }
    }
    return entry;
};
/**
 * Resolve the export directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolve = (project, node) => {
    const current = node.right;
    if (current.value === 200 /* Identifier */) {
        const identifier = current.fragment.data;
        const symbol = node.table.find(identifier);
        if (!symbol) {
            project.addError(current, 4102 /* UNDEFINED_IDENTIFIER */);
        }
        else {
            const entry = getEntry(project, symbol);
            if (entry) {
                entry.exported = true;
            }
        }
        return true;
    }
    return false;
};
exports.resolve = resolve;
//# sourceMappingURL=export.js.map
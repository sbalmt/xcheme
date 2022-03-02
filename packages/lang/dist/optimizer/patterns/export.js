"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Parser = require("../../parser");
/**
 * Consume the export directive for the given node and update the specified state.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns true when the given node is valid for the export directive, false otherwise.
 */
const consume = (project, node, state) => {
    const current = node.right;
    if (current.value === 200 /* Identifier */) {
        const identifier = current.fragment.data;
        const record = node.table.find(identifier);
        if (!record) {
            project.addError(current.fragment, 4102 /* UNDEFINED_IDENTIFIER */);
        }
        else {
            record.data.exported = true;
            state.record = record;
        }
        return true;
    }
    return false;
};
exports.consume = consume;
//# sourceMappingURL=export.js.map
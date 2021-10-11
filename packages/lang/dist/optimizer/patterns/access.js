"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identity = require("../../core/nodes/identity");
/**
 * Get all fragments from the given access node.
 * @param node Access node.
 * @returns Returns all the extracted path.
 */
const getPath = (node) => {
    if (node.left !== void 0 && node.right !== void 0) {
        return [...getPath(node.left), ...getPath(node.right)];
    }
    else if (node.left !== void 0) {
        return getPath(node.left);
    }
    else if (node.right !== void 0) {
        return getPath(node.right);
    }
    return [node.fragment.data];
};
/**
 * Consume a child node from the AST on the given parent and optimize the access pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const path = getPath(node);
    const identifier = path.join('@');
    if (state.type !== 3 /* Node */ || project.nodeEntries.has(identifier)) {
        project.addError(node, 4113 /* INVALID_MAP_ENTRY_REFERENCE */);
    }
    else {
        const directive = project.tokenEntries.get(path[0]);
        const member = project.tokenEntries.get(identifier);
        if (!directive || !member) {
            project.addError(node, 4102 /* UNDEFINED_IDENTIFIER */);
        }
        else if (member.dynamic) {
            project.addError(node, 4112 /* INVALID_MAP_REFERENCE */);
        }
        else if (directive.alias) {
            project.addError(node, 4113 /* INVALID_MAP_ENTRY_REFERENCE */);
        }
        else {
            parent.setChild(direction, new Identity.Node(node, member.identity));
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=access.js.map
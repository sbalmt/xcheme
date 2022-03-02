"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Identified = require("../../core/nodes/identified");
const Parser = require("../../parser");
/**
 * Get all nodes from the given access node.
 * @param node Access node.
 * @returns Returns an array containing all nodes.
 */
const getNodes = (node) => {
    if (node.left && node.right) {
        return [...getNodes(node.left), ...getNodes(node.right)];
    }
    else if (node.left) {
        return getNodes(node.left);
    }
    else if (node.right) {
        return getNodes(node.right);
    }
    return [node];
};
/**
 * Get the member record that corresponds to the specified nodes containing a member path.
 * @param project Project context.
 * @param base Base record.
 * @param nodes Node list containing the member path.
 * @returns Returns the corresponding member record or undefined when the member wasn't found.
 */
const getMember = (project, base, nodes) => {
    let member = base;
    for (let index = 1; index < nodes.length; index++) {
        const node = nodes[index];
        if (!(member = member.link?.get(node.fragment.data))) {
            project.addError(node.fragment, 4102 /* UNDEFINED_IDENTIFIER */);
            break;
        }
    }
    return member;
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
    const nodes = getNodes(node);
    const first = node.table.find(nodes[0].fragment.data);
    if (!first) {
        project.addError(nodes[0].fragment, 4102 /* UNDEFINED_IDENTIFIER */);
    }
    else {
        const member = getMember(project, first, nodes);
        if (member) {
            if (state.type !== 3 /* Node */ || member.data.type === 3 /* Node */) {
                project.addError(member.node.fragment, 4113 /* INVALID_MAP_ENTRY_REFERENCE */);
            }
            else if (member.data.dynamic) {
                project.addError(member.node.fragment, 4112 /* INVALID_MAP_REFERENCE */);
            }
            else if (first.value === 302 /* AliasToken */) {
                project.addError(first.node.fragment, 4113 /* INVALID_MAP_ENTRY_REFERENCE */);
            }
            else {
                parent.setChild(direction, new Identified.Node(node, member.data.identity));
            }
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=access.js.map
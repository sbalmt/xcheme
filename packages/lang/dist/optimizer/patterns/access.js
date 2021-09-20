"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Parser = require("../../parser");
const Identity = require("../nodes/identity");
/**
 * Determines whether or not the specified map symbol is accessible by a node directive.
 * @param symbol Map symbol.
 * @returns Returns true in case of success, false otherwise.
 */
const isNodeAccessible = (symbol) => {
    return symbol.value === 300 /* Token */ || symbol.value === 303 /* AliasToken */;
};
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
 * Consume the specified input node resolving its access pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const path = getPath(node);
    const symbol = node.table.find(path[0]);
    const entry = state.references[path.join('@')];
    if (symbol === void 0 || entry === void 0) {
        project.errors.push(new Core.Error(node.fragment, 4102 /* UNDEFINED_IDENTIFIER */));
    }
    else if (state.type === 2 /* Token */ || !isNodeAccessible(symbol)) {
        project.errors.push(new Core.Error(node.fragment, 4113 /* INVALID_MAP_ENTRY_REFERENCE */));
    }
    else if (entry.dynamic) {
        project.errors.push(new Core.Error(node.fragment, 4112 /* INVALID_MAP_REFERENCE */));
    }
    else {
        parent.setChild(direction, new Identity.Node(node, entry.identity, entry.dynamic));
    }
};
exports.consume = consume;
//# sourceMappingURL=access.js.map
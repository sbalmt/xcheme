"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.resolve = void 0;
const String = require("../../core/string");
const Mergeable = require("../../optimizer/nodes/mergeable");
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Determines whether or not the given node contains a map pattern.
 * @param project Input project.
 * @param node Input node.
 * @returns Returns true when the map pattern was found, false otherwise.
 */
const hasMapPattern = (project, node) => {
    if (node.value === 201 /* Reference */) {
        const identifier = node.fragment.data;
        const entry = project.tokenEntries.get(identifier) ?? project.nodeEntries.get(identifier);
        return entry?.dynamic ?? false;
    }
    return (node.value === 207 /* Map */ ||
        (node.left !== void 0 && hasMapPattern(project, node.left)) ||
        (node.right !== void 0 && hasMapPattern(project, node.right)));
};
/**
 * Resolve the specified input node as an 'OR' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
const resolve = (project, node, state) => {
    if (node.value !== 211 /* Or */) {
        const pattern = Expression.consume(project, node, state);
        if (pattern !== void 0) {
            return [pattern];
        }
    }
    else if (node instanceof Mergeable.Node) {
        if (node.type === 203 /* String */) {
            const fragments = node.sequence.map((node) => String.extract(node.fragment.data));
            if (fragments.length > 3 || fragments.find((fragment) => fragment.length > 1) !== void 0) {
                const routes = fragments.map((fragment) => project.coder.getRoute(fragment.split('')));
                return [project.coder.emitMapPattern(...routes)];
            }
            return [project.coder.emitChooseUnitsPattern(fragments)];
        }
        else {
            const units = node.sequence.map((node) => node.identity);
            if (units.length > 3) {
                const routes = units.map((unit) => project.coder.getRoute([unit]));
                return [project.coder.emitMapPattern(...routes)];
            }
            return [project.coder.emitChooseUnitsPattern(units)];
        }
    }
    else {
        let left = exports.resolve(project, node.left, state);
        if (left !== void 0) {
            if (state.dynamic && !hasMapPattern(project, node.left)) {
                left = [project.coder.emitIdentityPattern(state.identity, ...left)];
            }
            let right = exports.resolve(project, node.right, state);
            if (right !== void 0) {
                if (state.dynamic && !hasMapPattern(project, node.right)) {
                    right = [project.coder.emitIdentityPattern(state.identity, ...right)];
                }
                return [...left, ...right];
            }
        }
    }
    return void 0;
};
exports.resolve = resolve;
/**
 * Consume the specified input node resolving its 'OR' rule.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the rule is invalid.
 */
const consume = (project, node, state) => {
    const patterns = exports.resolve(project, node, state);
    if (patterns !== void 0) {
        if (patterns.length > 1) {
            return project.coder.emitChoosePattern(...patterns);
        }
        return patterns[0];
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=or.js.map
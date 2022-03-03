"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Sequential = require("../../core/nodes/sequential");
const Identified = require("../../core/nodes/identified");
const Member = require("../../core/nodes/member");
const String = require("../../core/string");
const Parser = require("../../parser");
const exception_1 = require("../../core/exception");
const Expression = require("./expression");
/**
 * Resolve all units for the given map entry node.
 * @param node Map entry node.
 * @returns Returns an array containing all the entry units.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveUnits = (node) => {
    if (node.value === 204 /* String */) {
        return String.extract(node.fragment.data).split('');
    }
    if (node instanceof Identified.Node) {
        return [node.identity];
    }
    if (!(node instanceof Sequential.Node)) {
        throw new exception_1.Exception('Unable to resolve the units for the map entry node.');
    }
    if (node.type !== 204 /* String */) {
        return node.sequence.map((node) => node.identity);
    }
    const words = node.sequence.map((node) => String.extract(node.fragment.data));
    return words.join('').split('');
};
/**
 * Resolve the corresponding route for the given map entry member.
 * @param project Project context.
 * @param map Map directive.
 * @param entry Map entry member.
 * @param state Consumption state.
 * @param units Route units.
 * @returns Returns the resolved route.
 */
const resolveRoute = (project, map, entry, state, units) => {
    if (!entry.empty) {
        const pattern = Expression.consume(project, entry, state);
        if (entry.dynamic || map.type === 1 /* Skip */) {
            return project.coder.getRoute(units, void 0, pattern);
        }
        return project.coder.getRoute(units, entry.identity, pattern);
    }
    if (map.type === 1 /* Skip */) {
        return project.coder.getRoute(units, void 0);
    }
    return project.coder.getRoute(units, entry.identity);
};
/**
 * Consume the given node resolving the 'MAP' pattern.
 * @param project Project context.
 * @param node Map node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern or undefined when the map node has no entry members.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node, state) => {
    let member = node.right;
    const directive = state.directive;
    const routes = [];
    while (member) {
        const current = member.right;
        if (!(current instanceof Member.Node)) {
            throw new exception_1.Exception('Map entry nodes must be instances of member nodes.');
        }
        const units = resolveUnits(current.route);
        const route = resolveRoute(project, directive, current, state, units);
        routes.push(route);
        member = member.next;
    }
    if (routes.length > 0) {
        return project.coder.emitMapPattern(...routes);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=map.js.map
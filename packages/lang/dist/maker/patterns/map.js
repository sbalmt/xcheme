"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Mergeable = require("../../core/nodes/mergeable");
const Identity = require("../../core/nodes/identity");
const Member = require("../../core/nodes/member");
const String = require("../../core/string");
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Resolve all units for the given entry node.
 * @param node Entry node.
 * @returns Returns the units array or undefined when the given entry isn't supported.
 */
const resolve = (node) => {
    if (node.value === 203 /* String */) {
        return String.extract(node.fragment.data).split('');
    }
    else if (node instanceof Identity.Node) {
        return [node.identity];
    }
    else if (node instanceof Mergeable.Node) {
        if (node.type !== 203 /* String */) {
            return node.sequence.map((node) => node.identity);
        }
        return node.sequence
            .map((node) => String.extract(node.fragment.data))
            .join('')
            .split('');
    }
    return void 0;
};
/**
 * Consume the given node resolving the 'MAP' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    let member = node.right;
    const directive = state.directive;
    const routes = [];
    while (member !== void 0) {
        const current = member.right;
        if (!(current instanceof Member.Node)) {
            project.addError(node, 4100 /* UNSUPPORTED_NODE */);
        }
        else {
            const entry = current.entry;
            const units = resolve(entry);
            if (units === void 0) {
                project.addError(node, 4099 /* UNEXPECTED_NODE */);
            }
            else {
                let route;
                if (!current.empty) {
                    const pattern = Expression.consume(project, current, state);
                    if (current.dynamic || directive.type === 0 /* Skip */) {
                        route = project.coder.getRoute(units, void 0, pattern);
                    }
                    else {
                        route = project.coder.getRoute(units, current.identity, pattern);
                    }
                }
                else if (directive.type === 0 /* Skip */) {
                    route = project.coder.getRoute(units, void 0);
                }
                else {
                    route = project.coder.getRoute(units, current.identity);
                }
                routes.push(route);
            }
        }
        member = member.next;
    }
    if (routes.length > 0) {
        return project.coder.emitMapPattern(...routes);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=map.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const String = require("../../core/string");
const Mergeable = require("../../optimizer/nodes/mergeable");
const Identity = require("../../optimizer/nodes/identity");
const Member = require("../../optimizer/nodes/member");
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Resolve all units for the given entry node.
 * @param entry Entry node.
 * @returns Returns the units array or undefined when the given entry isn't supported.
 */
const resolve = (entry) => {
    if (entry.value === 203 /* String */) {
        return String.extract(entry.fragment.data).split('');
    }
    else if (entry instanceof Identity.Node) {
        return [entry.identity];
    }
    else if (entry instanceof Mergeable.Node) {
        if (entry.type !== 203 /* String */) {
            return entry.sequence.map((node) => node.identity);
        }
        return entry.sequence
            .map((node) => String.extract(node.fragment.data))
            .join('')
            .split('');
    }
    return void 0;
};
/**
 * Consume the specified input node resolving its 'MAP' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    let member = node.right;
    const routes = [];
    while (member !== void 0) {
        const current = member.right;
        if (!(current instanceof Member.Node)) {
            project.errors.push(new Core.Error(node.fragment, 4100 /* UNSUPPORTED_NODE */));
        }
        else {
            const entry = current.entry;
            const units = resolve(entry);
            if (units === void 0) {
                project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
            }
            else {
                let route;
                if (current.right !== void 0 && current.right !== entry.right) {
                    const pattern = Expression.consume(project, current.right, state);
                    if (current.dynamic || state.type === 0 /* Skip */) {
                        route = project.coder.getRoute(units, void 0, pattern);
                    }
                    else {
                        route = project.coder.getRoute(units, current.identity, pattern);
                    }
                }
                else if (state.type === 0 /* Skip */) {
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
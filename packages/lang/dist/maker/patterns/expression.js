"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Parser = require("../../parser");
const Reference = require("./reference");
const String = require("./string");
const Range = require("./range");
const Map = require("./map");
const Access = require("./access");
const Or = require("./or");
const And = require("./and");
const Condition = require("./condition");
const Not = require("./not");
const Option = require("./option");
const Repeat = require("./repeat");
const Place = require("./place");
const Pivot = require("./pivot");
const Append = require("./append");
const Prepend = require("./prepend");
const Symbol = require("./symbol");
const Scope = require("./scope");
const Error = require("./error");
const Has = require("./has");
const Set = require("./set");
/**
 * Consume the given node resolving the expression patterns.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    switch (node.value) {
        case 201 /* Reference */:
            return Reference.consume(project, node, state);
        case 204 /* String */:
            return String.consume(project, node, state);
        case 205 /* Any */:
            return project.coder.emitAnyPattern();
        case 206 /* Range */:
            return Range.consume(project, node, state);
        case 208 /* Map */:
            return Map.consume(project, node, state);
        case 207 /* Access */:
            return Access.consume(project, node);
        case 210 /* Then */:
            return Condition.consume(project, node, state);
        case 212 /* Or */:
            return Or.consume(project, node, state);
        case 213 /* And */:
            return And.consume(project, node, state);
        case 214 /* Not */:
            return Not.consume(project, node, state);
        case 215 /* Opt */:
            return Option.consume(project, node, state);
        case 216 /* Repeat */:
            return Repeat.consume(project, node, state);
        case 220 /* Place */:
        case 219 /* PlaceRight */:
            return Place.consume(project, node, state, 1 /* Right */);
        case 217 /* PlaceNext */:
            return Place.consume(project, node, state, 2 /* Next */);
        case 218 /* PlaceLeft */:
            return Place.consume(project, node, state, 0 /* Left */);
        case 224 /* Append */:
        case 223 /* AppendRight */:
            return Append.consume(project, node, state, 1 /* Right */);
        case 221 /* AppendNext */:
            return Append.consume(project, node, state, 2 /* Next */);
        case 222 /* AppendLeft */:
            return Append.consume(project, node, state, 0 /* Left */);
        case 228 /* Prepend */:
        case 227 /* PrependRight */:
            return Prepend.consume(project, node, state, 1 /* Right */);
        case 225 /* PrependNext */:
            return Prepend.consume(project, node, state, 2 /* Next */);
        case 226 /* PrependLeft */:
            return Prepend.consume(project, node, state, 0 /* Left */);
        case 229 /* Pivot */:
            return Pivot.consume(project, node, state);
        case 230 /* Symbol */:
            return Symbol.consume(project, node, state);
        case 231 /* Scope */:
            return Scope.consume(project, node, state);
        case 232 /* Error */:
            return Error.consume(project, node, state);
        case 233 /* Has */:
            return Has.consume(project, node, state);
        case 234 /* Set */:
            return Set.consume(project, node, state);
        default:
            project.addError(node, 4099 /* UNEXPECTED_NODE */);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map
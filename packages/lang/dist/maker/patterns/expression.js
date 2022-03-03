"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Parser = require("../../parser");
const exception_1 = require("../../core/exception");
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
const Uncase = require("./uncase");
const Peek = require("./peek");
/**
 * Consume the given node resolving the expression patterns.
 * @param project Project context.
 * @param node Expression node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
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
        case 207 /* Map */:
            return Map.consume(project, node, state);
        case 236 /* Access */:
            return Access.consume(project, node);
        case 209 /* Then */:
            return Condition.consume(project, node, state);
        case 211 /* Or */:
            return Or.consume(project, node, state);
        case 212 /* And */:
            return And.consume(project, node, state);
        case 213 /* Not */:
            return Not.consume(project, node, state);
        case 214 /* Opt */:
            return Option.consume(project, node, state);
        case 215 /* Repeat */:
            return Repeat.consume(project, node, state);
        case 219 /* Place */:
        case 218 /* PlaceRight */:
            return Place.consume(project, node, state, 1 /* Right */);
        case 216 /* PlaceNext */:
            return Place.consume(project, node, state, 2 /* Next */);
        case 217 /* PlaceLeft */:
            return Place.consume(project, node, state, 0 /* Left */);
        case 223 /* Append */:
        case 222 /* AppendRight */:
            return Append.consume(project, node, state, 1 /* Right */);
        case 220 /* AppendNext */:
            return Append.consume(project, node, state, 2 /* Next */);
        case 221 /* AppendLeft */:
            return Append.consume(project, node, state, 0 /* Left */);
        case 227 /* Prepend */:
        case 226 /* PrependRight */:
            return Prepend.consume(project, node, state, 1 /* Right */);
        case 224 /* PrependNext */:
            return Prepend.consume(project, node, state, 2 /* Next */);
        case 225 /* PrependLeft */:
            return Prepend.consume(project, node, state, 0 /* Left */);
        case 228 /* Pivot */:
            return Pivot.consume(project, node, state);
        case 229 /* Symbol */:
            return Symbol.consume(project, node, state);
        case 230 /* Scope */:
            return Scope.consume(project, node, state);
        case 231 /* Error */:
            return Error.consume(project, node, state);
        case 232 /* Has */:
            return Has.consume(project, node, state);
        case 233 /* Set */:
            return Set.consume(project, node, state);
        case 234 /* Uncase */:
            return Uncase.consume(project, node, state);
        case 235 /* Peek */:
            return Peek.consume(project, node, state);
        default:
            throw new exception_1.Exception(`Invalid expression node type (${node.value}).`);
    }
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map
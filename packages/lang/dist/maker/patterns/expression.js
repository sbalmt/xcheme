"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Parser = require("../../parser");
const Condition = require("./condition");
const Or = require("./or");
const And = require("./and");
const Negate = require("./not");
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
const Reference = require("./reference");
const Range = require("./range");
const Alphabet = require("./alphabet");
/**
 * Consume the specified input node resolving its expression patterns.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    switch (node.value) {
        case 201 /* Reference */:
            return Reference.consume(project, node, state);
        case 203 /* Alphabet */:
            return Alphabet.consume(project, node, state);
        case 204 /* Any */:
            return project.coder.getAny();
        case 205 /* Range */:
            return Range.consume(project, node, state);
        case 206 /* Then */:
            return Condition.consume(project, node, state);
        case 208 /* Or */:
            return Or.consume(project, node, state);
        case 209 /* And */:
            return And.consume(project, node, state);
        case 210 /* Not */:
            return Negate.consume(project, node, state);
        case 211 /* Opt */:
            return Option.consume(project, node, state);
        case 212 /* Repeat */:
            return Repeat.consume(project, node, state);
        case 216 /* Place */:
        case 215 /* PlaceRight */:
            return Place.consume(project, node, state, 1 /* Right */);
        case 213 /* PlaceNext */:
            return Place.consume(project, node, state, 2 /* Next */);
        case 214 /* PlaceLeft */:
            return Place.consume(project, node, state, 0 /* Left */);
        case 220 /* Append */:
        case 219 /* AppendRight */:
            return Append.consume(project, node, state, 1 /* Right */);
        case 217 /* AppendNext */:
            return Append.consume(project, node, state, 2 /* Next */);
        case 218 /* AppendLeft */:
            return Append.consume(project, node, state, 0 /* Left */);
        case 224 /* Prepend */:
        case 223 /* PrependRight */:
            return Prepend.consume(project, node, state, 1 /* Right */);
        case 221 /* PrependNext */:
            return Prepend.consume(project, node, state, 2 /* Next */);
        case 222 /* PrependLeft */:
            return Prepend.consume(project, node, state, 0 /* Left */);
        case 225 /* Pivot */:
            return Pivot.consume(project, node, state);
        case 226 /* Symbol */:
            return Symbol.consume(project, node, state);
        case 227 /* Scope */:
            return Scope.consume(project, node, state);
        case 228 /* Error */:
            return Error.consume(project, node, state);
        case 229 /* Has */:
            return Has.consume(project, node, state);
        case 230 /* Set */:
            return Set.consume(project, node, state);
        default:
            project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map
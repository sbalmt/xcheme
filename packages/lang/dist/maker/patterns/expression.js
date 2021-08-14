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
        case 207 /* Then */:
            return Condition.consume(project, node, state);
        case 209 /* Or */:
            return Or.consume(project, node, state);
        case 210 /* And */:
            return And.consume(project, node, state);
        case 211 /* Not */:
            return Negate.consume(project, node, state);
        case 212 /* Opt */:
            return Option.consume(project, node, state);
        case 213 /* Rep */:
            return Repeat.consume(project, node, state);
        case 215 /* Pivot */:
            return Pivot.consume(project, node, state);
        case 214 /* Place */:
        case 224 /* PlaceRight */:
            return Place.consume(project, node, state, 1 /* Right */);
        case 216 /* Append */:
        case 225 /* AppendRight */:
            return Append.consume(project, node, state, 1 /* Right */);
        case 217 /* Prepend */:
        case 226 /* PrependRight */:
            return Prepend.consume(project, node, state, 1 /* Right */);
        case 218 /* PlaceNext */:
            return Place.consume(project, node, state, 2 /* Next */);
        case 219 /* AppendNext */:
            return Append.consume(project, node, state, 2 /* Next */);
        case 220 /* PrependNext */:
            return Prepend.consume(project, node, state, 2 /* Next */);
        case 221 /* PlaceLeft */:
            return Place.consume(project, node, state, 0 /* Left */);
        case 222 /* AppendLeft */:
            return Append.consume(project, node, state, 0 /* Left */);
        case 223 /* PrependLeft */:
            return Prepend.consume(project, node, state, 0 /* Left */);
        case 227 /* Symbol */:
            return Symbol.consume(project, node, state);
        case 228 /* Scope */:
            return Scope.consume(project, node, state);
        case 229 /* Error */:
            return Error.consume(project, node, state);
        case 230 /* Has */:
            return Has.consume(project, node, state);
        case 231 /* Set */:
            return Set.consume(project, node, state);
        case 232 /* Reference */:
            return Reference.consume(project, node, state);
        case 233 /* Any */:
            return project.coder.getAny();
        case 234 /* Range */:
            return Range.consume(project, node, state);
        case 235 /* Alphabet */:
            return Alphabet.consume(project, node, state);
        default:
            project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map
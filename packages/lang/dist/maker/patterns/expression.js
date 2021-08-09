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
        case 212 /* Rep */:
            return Repeat.consume(project, node, state);
        case 214 /* Pivot */:
            return Pivot.consume(project, node, state);
        case 213 /* Place */:
        case 223 /* PlaceRight */:
            return Place.consume(project, node, state, 1 /* Right */);
        case 215 /* Append */:
        case 224 /* AppendRight */:
            return Append.consume(project, node, state, 1 /* Right */);
        case 216 /* Prepend */:
        case 225 /* PrependRight */:
            return Prepend.consume(project, node, state, 1 /* Right */);
        case 217 /* PlaceNext */:
            return Place.consume(project, node, state, 2 /* Next */);
        case 218 /* AppendNext */:
            return Append.consume(project, node, state, 2 /* Next */);
        case 219 /* PrependNext */:
            return Prepend.consume(project, node, state, 2 /* Next */);
        case 220 /* PlaceLeft */:
            return Place.consume(project, node, state, 0 /* Left */);
        case 221 /* AppendLeft */:
            return Append.consume(project, node, state, 0 /* Left */);
        case 222 /* PrependLeft */:
            return Prepend.consume(project, node, state, 0 /* Left */);
        case 226 /* Symbol */:
            return Symbol.consume(project, node, state);
        case 227 /* Scope */:
            return Scope.consume(project, node, state);
        case 228 /* Reference */:
            return Reference.consume(project, node, state);
        case 229 /* Any */:
            return project.coder.getAny();
        case 230 /* Range */:
            return Range.consume(project, node, state);
        case 231 /* Alphabet */:
            return Alphabet.consume(project, node, state);
        default:
            project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map
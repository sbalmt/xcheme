"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Parser = require("../../parser");
const Reference = require("./reference");
const Mergeable = require("./mergeable");
const String = require("./string");
const Range = require("./range");
const Map = require("./map");
const Access = require("./access");
/**
 * Consume the specified input node optimizing its expression pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    switch (node.value) {
        case 204 /* Any */:
        case 205 /* Range */:
            Range.consume(project, direction, parent, state);
            break;
        case 201 /* Reference */:
            Reference.consume(project, direction, parent, state);
            break;
        case 203 /* String */:
            String.consume(project, direction, parent, state);
            break;
        case 207 /* Map */:
            Map.consume(project, direction, parent, state);
            break;
        case 206 /* Access */:
            Access.consume(project, direction, parent, state);
            break;
        case 211 /* Or */:
            Mergeable.consume(project, direction, parent, 211 /* Or */, state);
            break;
        case 212 /* And */:
            Mergeable.consume(project, direction, parent, 212 /* And */, state);
            break;
        default:
            exports.consume(project, 1 /* Right */, node, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=expression.js.map
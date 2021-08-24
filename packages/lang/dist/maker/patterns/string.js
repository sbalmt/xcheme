"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.resolve = void 0;
const String = require("../common/string");
/**
 * Get the identity of the token that corresponds to the specified string.
 * When there's no token matching the given string, a new one will be created.
 * @param project Input project.
 * @param state Context state.
 * @param string Alphabet value.
 * @returns Returns the corresponding token identity.
 */
const getTokenId = (project, state, string) => {
    const token = project.tokenEntries.get(string);
    if (!token) {
        const identity = state.counter++;
        const pattern = project.coder.emitStringPattern([identity]);
        project.tokenEntries.add(identity, string, pattern, 2 /* Loose */);
        return identity;
    }
    return token.identity;
};
/**
 * Resolve the specified input node as a string pattern.
 * It can also update the given project and context state when a new token needs to be created.
 * @param project Input project.
 * @param state Context state.
 * @param value String value.
 * @returns Returns the string resolution which is a token identity or an escaped string units.
 */
const resolve = (project, state, value) => {
    if (state.type === 2 /* Node */) {
        return [getTokenId(project, state, value)];
    }
    return String.extract(value).split('');
};
exports.resolve = resolve;
/**
 * Consume the specified input node resolving its string patterns.
 * It can also update the given project and context state when a new token needs to be created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result.
 */
const consume = (project, node, state) => {
    const name = node.fragment.data;
    const units = exports.resolve(project, state, name);
    return project.coder.emitStringPattern(units);
};
exports.consume = consume;
//# sourceMappingURL=string.js.map
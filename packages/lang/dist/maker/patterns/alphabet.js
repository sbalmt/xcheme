"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.resolve = void 0;
const String = require("../common/string");
/**
 * Get the Id of the token that corresponds to the specified alphabet.
 * When there's no token matching the given alphabet, a new one will be created.
 * @param project Input project.
 * @param state Context state.
 * @param alphabet Alphabet value.
 * @returns Returns the corresponding token Id.
 */
const getTokenId = (project, state, alphabet) => {
    const token = project.tokenEntries.get(alphabet);
    if (!token) {
        const id = state.counters.token++;
        const pattern = project.coder.getAlphabet([id]);
        project.tokenEntries.add(id, alphabet, pattern, 2 /* Loose */);
        return id;
    }
    return token.id;
};
/**
 * Resolve the specified input node as an alphabet pattern.
 * It can also update the given project and context state when a new token is created.
 * @param project Input project.
 * @param state Context state.
 * @param value Alphabet value.
 * @returns Returns the alphabet resolution which is a token Id or an escaped string.
 */
const resolve = (project, state, value) => {
    if (state.type === 2 /* Node */) {
        return [getTokenId(project, state, value)];
    }
    return String.extract(value).split('');
};
exports.resolve = resolve;
/**
 * Consume the specified input node resolving its alphabet patterns.
 * It can also update the given project and context state when a new token is created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result.
 */
const consume = (project, node, state) => {
    const name = node.fragment.data;
    const alphabet = exports.resolve(project, state, name);
    return project.coder.getAlphabet(alphabet);
};
exports.consume = consume;
//# sourceMappingURL=alphabet.js.map
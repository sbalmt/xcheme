"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.consumeTokens = void 0;
const Core = require("@xcheme/core");
const program_1 = require("./program");
/**
 * Consume the specified tokens and produce an AST for updating the given context.
 * @param tokens Input tokens.
 * @param context Input context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeTokens = (tokens, context) => {
    const source = new Core.TokenSource(tokens, context);
    if (!program_1.Program.consume(source)) {
        const fragment = tokens[source.longestState.offset]?.fragment ?? source.fragment;
        context.errors.push(new Core.Error(fragment, 4098 /* UNEXPECTED_SYNTAX */));
        return false;
    }
    return true;
};
exports.consumeTokens = consumeTokens;
/**
 * Consume the given source.
 * @param source Data source.
 * @returns Returns true when the source was consumed, otherwise returns false.
 */
const consume = (source) => {
    return program_1.Program.consume(source);
};
exports.consume = consume;
//# sourceMappingURL=index.js.map
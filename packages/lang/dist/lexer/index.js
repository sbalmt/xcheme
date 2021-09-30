"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.consumeText = void 0;
const Core = require("@xcheme/core");
const program_1 = require("./program");
/**
 * Consume the specified text and produce a list of tokens for updating the given context.
 * @param text Input text.
 * @param context Input context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeText = (text, context) => {
    const source = new Core.TextSource(text, context);
    if (!program_1.Program.consume(source)) {
        context.addError(source.fragment, 4097 /* UNEXPECTED_TOKEN */);
        return false;
    }
    return true;
};
exports.consumeText = consumeText;
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
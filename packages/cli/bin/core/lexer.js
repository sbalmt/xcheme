"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
const Core = require("@xcheme/core");
const Lang = require("@xcheme/lang");
const Console = require("./console");
const Tokens = require("./tokens");
/**
 * Tokenize the given input source.
 * @param text Input text.
 * @param context Consumption context.
 * @param tokens Determines whether or not the debug mode is active fot tokens.
 * @returns Returns true in case of success, false otherwise.
 */
const tokenize = (program, text, context, tokens) => {
    const source = new Core.TextSource(text, context);
    Console.printLine('Tokenizing...');
    if (!program.consume(source)) {
        context.errors.push(new Core.Error(source.fragment, 4097 /* UNEXPECTED_TOKEN */));
        return false;
    }
    Console.clearLine();
    if (tokens) {
        Tokens.print(context.tokens);
    }
    return true;
};
exports.tokenize = tokenize;
//# sourceMappingURL=lexer.js.map
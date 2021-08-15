"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const Core = require("@xcheme/core");
const Lang = require("@xcheme/lang");
const Console = require("./console");
const Symbols = require("./symbols");
const Nodes = require("./nodes");
/**
 * Parse the given input tokens.
 * @param tokens Input tokens.
 * @param context Consumption context.
 * @param symbols Determines whether or not the debug mode is active.
 * @param nodes Determines whether or not the debug mode is active.
 * @returns Returns true in case of success, false otherwise.
 */
const parse = (program, tokens, context, symbols, nodes) => {
    const source = new Core.TokenSource(tokens, context);
    Console.printLine('Parsing...');
    if (!program.consume(source)) {
        const fragment = tokens[source.longestState.offset]?.fragment ?? source.fragment;
        context.errors.push(new Core.Error(fragment, 4098 /* UNEXPECTED_SYNTAX */));
        return false;
    }
    Console.clearLine();
    if (symbols) {
        Symbols.print(context.node);
    }
    if (nodes) {
        Nodes.print(context.node);
    }
    return true;
};
exports.parse = parse;
//# sourceMappingURL=parser.js.map
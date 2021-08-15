"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.perform = void 0;
const FS = require("fs");
const Core = require("@xcheme/core");
const Lang = require("@xcheme/lang");
const Console = require("../core/console");
const Errors = require("../core/errors");
/**
 * Tokenize the given input source.
 * @param text Input text.
 * @param context Consumption context.
 * @returns Returns true in case of success, false otherwise.
 */
const tokenize = (text, context) => {
    Console.printLine('Tokenizing...');
    if (Lang.Lexer.consumeText(text, context)) {
        Console.clearLine();
        return true;
    }
    Errors.print(context.errors);
    return false;
};
/**
 * Parse the given input tokens.
 * @param tokens Input tokens.
 * @param context Consumption context.
 * @returns Returns true in case of success, false otherwise.
 */
const parse = (tokens, context) => {
    Console.printLine('Parsing...');
    if (Lang.Parser.consumeTokens(tokens, context)) {
        Console.clearLine();
        return true;
    }
    Errors.print(context.errors);
    return false;
};
/**
 * Make a new project based on the given input nodes.
 * @param node Input node.
 * @param project Consumption project.
 * @returns Returns true in case of success, false otherwise.
 */
const make = (node, project) => {
    Console.printLine('Making...');
    if (Lang.Maker.consumeNodes(node, project)) {
        Console.clearLine();
        return true;
    }
    Errors.print(project.errors);
    return false;
};
/**
 * Perform a new build for the given input file.
 * @param input Input file.
 * @param output Output file.
 */
const perform = (input, output) => {
    const text = FS.readFileSync(input).toString();
    const context = new Core.Context('maker');
    if (tokenize(text, context) && parse(context.tokens, context)) {
        const project = new Lang.Project(new Lang.TextCoder());
        if (make(context.node, project)) {
            const lib = "const Core = require('../../packages/core');";
            FS.writeFileSync(output, `${lib}\n${project.lexer}\n${project.parser}\n`);
            if (output !== 1) {
                Console.printLine('Done!');
            }
        }
    }
};
exports.perform = perform;
//# sourceMappingURL=build.js.map
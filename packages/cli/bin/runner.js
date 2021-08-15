"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const Path = require("path");
const Core = require("@xcheme/core");
const debug = [];
let context;
function run(path, input) {
    const { Lexer, Parser } = require(Path.join(process.cwd(), path));
    context = new Core.Context('runner');
    const text = new Core.TextSource(input, context);
    if (!Lexer.consume(text)) {
        const fragment = text.fragment;
        const location = fragment.location;
        throw `Unexpected token \'${fragment.data}\' at line ${location.line + 1}, column ${location.column + 1}`;
    }
    const tokens = new Core.TokenSource(context.tokens, context);
    if (!Parser.consume(tokens)) {
        const fragment = tokens.fragment;
        const location = fragment.location;
        throw `Unexpected syntax \'${fragment.data}\' at line ${location.line + 1}, column ${location.column + 1}`;
    }
}
try {
    const input = FS.readFileSync(0).toString();
    const path = process.argv[2];
    debug.push(...process.argv.slice(3));
    if (!FS.lstatSync(path).isFile()) {
        throw 'Invalid input file.';
    }
    run(path, input);
}
catch (error) {
    console.log(error);
}
finally {
    if (context) {
        console.group('Errors:');
        printErrors(context.errors);
        console.groupEnd();
        if (debug.includes('tokens')) {
            console.group('Tokens:');
            printTokens(context.tokens);
            console.groupEnd();
        }
        if (debug.includes('symbols')) {
            console.group('Symbols:');
            printSymbols(context.table);
            console.groupEnd();
        }
        if (debug.includes('nodes')) {
            console.group('Nodes:');
            printNodes(context.node);
            console.groupEnd();
        }
    }
}
function getFragmentData(fragment) {
    return `'${fragment.data.replace(/\n/g, '\\n')}' ${fragment.begin}:${fragment.end}`;
}
function printErrors(errors) {
    for (const error of errors) {
        console.log(`${getFragmentData(error.fragment)} (${error.value})`);
    }
}
function printTokens(tokens) {
    for (const token of tokens) {
        console.log(`${getFragmentData(token.fragment)} (${token.value.toString()})`);
    }
}
function printSymbols(table) {
    for (const key of table.keys) {
        const record = table.getRecord(key);
        console.log(`${getFragmentData(record.fragment)} (${record.value.toString()})`);
    }
}
function printNodes(node) {
    function printTree(label, node, next) {
        console.group(`${label} ${getFragmentData(node.fragment)} (${node.value.toString()})`);
        if (node.left) {
            printTree('Left', node.left, true);
        }
        if (node.right) {
            printTree('Right', node.right, true);
        }
        if (next && node.next) {
            printNodes(node);
        }
        console.groupEnd();
    }
    let current = node;
    while ((current = current.next)) {
        printTree('Next', current);
    }
}
//# sourceMappingURL=runner.js.map
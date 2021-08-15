"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const Core = require("@xcheme/core");
const Lang = require("@xcheme/lang");
const debug = [];
let context;
function run(context, input) {
    Lang.Lexer.consumeText(input, context);
    Lang.Parser.consumeTokens(context.tokens, context);
    if (debug.length === 0) {
        const project = new Lang.Project(new Lang.TextCoder());
        Lang.Maker.consumeNodes(context.node, project);
        console.log("const Core = require('@xcheme/core');");
        console.log(project.lexer);
        console.log(project.parser);
    }
}
try {
    debug.push(...process.argv.slice(2));
    const input = FS.readFileSync(0).toString();
    context = new Core.Context('maker');
    run(context, input);
}
catch (error) {
    console.log(error);
}
finally {
    if (context) {
        if (context.errors.length > 0) {
            console.group('Errors:');
            printErrors(context.errors);
            console.groupEnd();
        }
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
    return `'${fragment.data.replace('\n', '\\n')}' ${fragment.begin}:${fragment.end}`;
}
function printErrors(errors) {
    for (const error of errors) {
        console.log(`${getFragmentData(error.fragment)} (${error.value})`);
    }
}
function printTokens(tokens) {
    for (const token of tokens) {
        console.log(`${getFragmentData(token.fragment)} (${token.value})`);
    }
}
function printSymbols(table) {
    for (const key of table.keys) {
        const record = table.getRecord(key);
        console.log(`${getFragmentData(record.fragment)} (${record.value})`);
    }
}
function printNodes(node) {
    function printTree(label, node, next) {
        console.group(`${label} ${getFragmentData(node.fragment)} (${node.value})`);
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
//# sourceMappingURL=builder.js.map
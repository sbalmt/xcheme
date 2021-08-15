"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;
const Console = require("../core/console");
const Version = require("../core/version");
/**
 * Print the help usage.
 */
const print = () => {
    Console.printLine(`Version ${Version.Number}`);
    Console.printLine('Syntax:   xcm [options]');
    Console.printLine('');
    Console.printLine('Examples: xcm -i source.xcm');
    Console.printLine('          xcm -i source.xcm -o parser.js');
    Console.printLine('');
    Console.printLine('Options:');
    Console.printLine('  -h, --help     Show this help.');
    Console.printLine('  -v, --version  Print the CLI version.');
    Console.printLine('  -i, --input    Define the input file location (Default is stdin).');
    Console.printLine('  -o, --output   Define the output file location (Default is stdout).');
    Console.printLine('');
};
exports.print = print;
//# sourceMappingURL=help.js.map
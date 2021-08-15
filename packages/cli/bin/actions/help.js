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
    Console.printLine('  -h, --help       Show this help.');
    Console.printLine('  -v, --version    Print the version.');
    Console.printLine('  -s, --source     Source file location (Default is stdin).');
    Console.printLine('  -t, --target     Target file location (Default is stdout).');
    Console.printLine('  --run            Run the resulting project in the target file.');
    Console.printLine('  --tokens         Print a list containing all the resulting tokens.');
    Console.printLine('  --symbols        Print a table containing all the resulting symbols.');
    Console.printLine('  --nodes          Print a ternary tree containing all the resulting nodes.');
    Console.printLine('');
};
exports.print = print;
//# sourceMappingURL=help.js.map
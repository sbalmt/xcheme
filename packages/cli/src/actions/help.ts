import * as Console from '../core/console';
import * as Version from '../core/version';

/**
 * Print the help usage.
 */
export const print = (): void => {
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

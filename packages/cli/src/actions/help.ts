import * as Version from '../core/version';

import { Output } from '../core/console';

/**
 * Print the help usage.
 */
export const print = (): void => {
  Output.printLine(`Version ${Version.Number}`);
  Output.printLine('Syntax:   xcm [options]');
  Output.printLine('');
  Output.printLine('Examples: xcm -i source.xcm');
  Output.printLine('          xcm -i source.xcm -o parser.js');
  Output.printLine('');
  Output.printLine('Options:');
  Output.printLine('  -h, --help       Show this help.');
  Output.printLine('  -v, --version    Print the version.');
  Output.printLine('  -s, --source     Source file location (Default is stdin).');
  Output.printLine('  -t, --target     Target file location (Default is stdout).');
  Output.printLine('  --run            Run the resulting project in the target file.');
  Output.printLine('  --tokens         Print a list containing all the resulting tokens.');
  Output.printLine('  --symbols        Print a table containing all the resulting symbols.');
  Output.printLine('  --nodes          Print a ternary tree containing all the resulting nodes.');
  Output.printLine('');
};

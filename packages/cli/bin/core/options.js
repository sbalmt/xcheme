"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlags = void 0;
/**
 * Load all the flags based on the given input arguments.
 * @param args Input arguments.
 * @returns Returns the flags state.
 */
const getFlags = (args) => {
    const flags = { debug: {} };
    for (let index = 0; index < args.length; index++) {
        const option = args[index];
        switch (option) {
            case '-h':
            case '--help':
                flags.help = true;
                return flags;
            case '-v':
            case '--version':
                flags.version = true;
                return flags;
            case '-s':
            case '--source':
                flags.source = args[++index];
                break;
            case '-t':
            case '--target':
                flags.target = args[++index];
                break;
            case '--run':
                flags.run = true;
                break;
            case '--tokens':
                flags.debug.tokens = true;
                break;
            case '--symbols':
                flags.debug.symbols = true;
                break;
            case '--nodes':
                flags.debug.nodes = true;
                break;
            default:
                throw `Option '${option}' is not supported.`;
        }
    }
    return flags;
};
exports.getFlags = getFlags;
//# sourceMappingURL=options.js.map
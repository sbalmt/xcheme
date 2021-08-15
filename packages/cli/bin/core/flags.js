"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
/**
 * Load all the flags state based on the given input arguments.
 * @param args Input arguments.
 * @returns Returns the flags state.
 */
const load = (args) => {
    const state = {};
    for (let index = 0; index < args.length; index++) {
        const flag = args[index];
        switch (flag) {
            case '-h':
            case '--help':
                state.help = true;
                return state;
            case '-v':
            case '--version':
                state.version = true;
                return state;
            case '-i':
            case '--input':
                state.input = args[++index];
                break;
            case '-o':
            case '--output':
                state.output = args[++index];
                break;
        }
    }
    return state;
};
exports.load = load;
//# sourceMappingURL=flags.js.map
/**
 * Flags state.
 */
type Flags = {
  /**
   * Determines whether or not the help option is active.
   */
  help?: boolean;
  /**
   * Determines whether or not the version option is active.
   */
  version?: boolean;
  /**
   * Source location.
   */
  source?: string;
  /**
   * Target location.
   */
  target?: string;
  /**
   * Determines whether or not the project should consume the target.
   */
  run?: boolean;
  /**
   * Debug state.
   */
  debug: Debug;
};

/**
 * Debug state.
 */
export type Debug = {
  /**
   * Determines whether or not all resulting tokens should be print.
   */
  tokens?: boolean;
  /**
   * Determines whether or not all resulting symbols should be print.
   */
  symbols?: boolean;
  /**
   * Determines whether or not all resulting nodes should be print.
   */
  nodes?: boolean;
};

/**
 * Load all the flags based on the given input arguments.
 * @param args Input arguments.
 * @returns Returns the flags state.
 */
export const getFlags = (args: string[]): Flags => {
  const flags: Flags = { debug: {} };
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

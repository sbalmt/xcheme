import * as Types from '../core/types';

/**
 * Context consumption state.
 */
export type State = {
  /**
   * State type.
   */
  type: Types.Directives;
  /**
   * State origin.
   */
  origin: Types.Origins;
  /**
   * Anchor node.
   */
  anchor: Types.Node;
  /**
   * Directive record.
   */
  record?: Types.Record;
};

/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @returns Returns the new state.
 */
export const getNewState = (anchor: Types.Node): State => {
  return {
    type: Types.Directives.Unknown,
    origin: Types.Origins.User,
    anchor
  };
};

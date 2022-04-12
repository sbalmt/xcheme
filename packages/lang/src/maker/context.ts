import * as Types from '../core/types';

/**
 * Store the consumption state for the context.
 */
export type State = {
  /**
   * Current directive.
   */
  directive: Types.Node;
  /**
   * Determines whether or not the current expression is dynamic.
   */
  dynamic: boolean;
};

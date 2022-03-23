import * as Nodes from '../core/nodes';

/**
 * Store the consumption state for the context.
 */
export type State = {
  /**
   * Current directive.
   */
  directive: Nodes.Directive;
  /**
   * Determines whether or not the current expression is dynamic.
   */
  dynamic: boolean;
};

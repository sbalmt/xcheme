import * as Directive from '../core/nodes/directive';

/**
 * Store the consumption state for the context.
 */
export type State = {
  /**
   * Current directive.
   */
  directive: Directive.Node;
};

import * as Core from '@xcheme/core';

import * as Entries from '../core/entries';

/**
 * Context types.
 */
export const enum Types {
  Undefined,
  Skip,
  Token,
  Node
}

/**
 * Store the consumption state for the context.
 */
export type State = {
  /**
   * Context type.
   */
  type: Types;
  /**
   * Anchor node.
   */
  anchor: Core.Node;
  /**
   * Identity counter.
   */
  counter: number;
  /**
   * Current entry.
   */
  entry: Entries.Entry;
};

/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param counter Auto identity counter.
 * @returns Returns the new state.
 */
export const getNewState = (anchor: Core.Node, counter: number): State => {
  return {
    type: Types.Undefined,
    anchor: anchor,
    counter,
    entry: {
      type: Entries.Types.Undefined,
      origin: Entries.Origins.Undefined,
      identifier: '?',
      identity: counter,
      dynamic: false,
      references: 0,
      pattern: undefined
    }
  };
};

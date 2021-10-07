import * as Core from '@xcheme/core';

import * as Entries from '../core/entries';

/**
 * Context entry.
 */
type Entry = {
  /**
   * Entry origin.
   */
  origin: Entries.Origins;
  /**
   * Entry identifier.
   */
  identifier: string;
  /**
   * Entry identity.
   */
  identity: number;
  /**
   * Determines whether or not the entry is an alias.
   */
  alias: boolean;
  /**
   * Determines whether or not the entry has a dynamic identity.
   */
  dynamic: boolean;
};

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
 * Context consumption state.
 */
export type State = {
  /**
   * Context type.
   */
  type: Types;
  /**
   * Anchor node from the AST.
   */
  anchor: Core.Node;
  /**
   * Auto identity counter.
   */
  counter: number;
  /**
   * Current entry.
   */
  entry: Entry;
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
    anchor,
    counter,
    entry: {
      origin: Entries.Origins.User,
      identifier: '?',
      identity: counter,
      alias: false,
      dynamic: false
    }
  };
};

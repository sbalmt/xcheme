import type * as Reference from './reference';

import * as Core from '@xcheme/core';

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
   * Previous entry node.
   */
  entry: Core.Node;
  /**
   * Current identity.
   */
  identity: number;
  /**
   * All references.
   */
  references: Reference.Map;
};

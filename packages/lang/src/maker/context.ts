/**
 * Context pointers set.
 */
export type Pointers = Set<string>;

/**
 * Context types.
 */
export const enum Types {
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
   * Current identity.
   */
  identity: number;
  /**
   * Determines whether or not the state has a dynamic identity.
   */
  dynamic: boolean;
};

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
 * Store the consumption context state.
 */
export type State = {
  /**
   * Current identity.
   */
  identity: number;
  /**
   * Context pointers.
   */
  pointers: Pointers;
  /**
   * Current counter.
   */
  counter: number;
  /**
   * Context type.
   */
  type: Types;
};

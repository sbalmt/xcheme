/**
 * Context pointers set.
 */
export type Pointers = Set<string>;

/**
 * Context Id counters.
 */
export type Counters = {
  /**
   * Token entries counter.
   */
  token: number;
  /**
   * Node entries counter.
   */
  node: number;
};

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
   * Current Id.
   */
  id: number;
  /**
   * Context pointers.
   */
  pointers: Pointers;
  /**
   * Context Id counters.
   */
  counters: Counters;
  /**
   * Context type.
   */
  type: Types;
};

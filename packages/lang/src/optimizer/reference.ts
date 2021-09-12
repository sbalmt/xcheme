/**
 * Reference types.
 */
export const enum Types {
  User,
  Loose
}

/**
 * Reference entry.
 */
export type Entry = {
  /**
   * Reference type.
   */
  type: Types;
  /**
   * Reference identifier.
   */
  identifier: string;
  /**
   * Reference identity.
   */
  identity: number;
};

/**
 * Reference Map.
 */
export type Map = {
  [key: string]: Entry;
};
